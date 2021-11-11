import {addingContent} from './render-photos.js';
import {showAlert, showSuccessfulPost, showUnsuccessfulPost} from './alerts.js';
import {closeFormEditImage} from './editing-photo.js';
import {formUploadFile} from './form-upload-file.js';
import {onCloseFormEditImageKeydown} from './form-upload-file.js';
import {
  filterComment,
  filterDefault,
  setFilterComments,
  setFilterDefault,
  showFilters,
  setFilterRandom,
  filterRandom
} from './sort.js';
import {debounce} from './utils/utils.js';

const TIMEOUT_DELAY = 500;

const createLoader = (onSuccess, onError) =>
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return  response.json();
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((data) => onSuccess(data))
    .catch((err) => onError(err));


const sendPhoto = (evt) => {
  evt.preventDefault();

  const formData = new FormData(formUploadFile);

  fetch('https://24.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: formData,
    })
    .then((response) => {
      if (response.ok) {
        closeFormEditImage();
        showSuccessfulPost();
        document.removeEventListener('keydown', onCloseFormEditImageKeydown);
      }
      else {
        closeFormEditImage();
        document.removeEventListener('keydown', onCloseFormEditImageKeydown);
        showUnsuccessfulPost();
      }
    })
    .catch((err) => (err));
};


createLoader((data) => {
  addingContent(data, filterDefault);
  setFilterComments(debounce(()=>  addingContent(filterComment(data)), TIMEOUT_DELAY));
  setFilterDefault(debounce(()=> addingContent(filterDefault(data)), TIMEOUT_DELAY));
  setFilterRandom(debounce(()=> addingContent(filterRandom(data)), TIMEOUT_DELAY));
}, showAlert).then(showFilters);

export {sendPhoto, createLoader};
