import {addContent} from './render-photos.js';
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
const FROM_BACKEND = 'https://24.javascript.pages.academy/kekstagram/data';
const SEND_TO_BACKEND = 'https://24.javascript.pages.academy/kekstagram';

const createLoader = (onSuccess, onError) =>
  fetch(FROM_BACKEND)
    .then((response) => {
      if (response.ok) {
        return  response.json();
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((data) => onSuccess(data))
    .then(showFilters)
    .catch((err) => onError(err));


const onSendPhoto = (evt) => {
  evt.preventDefault();

  const formData = new FormData(formUploadFile);

  fetch(SEND_TO_BACKEND,
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
  addContent(data, filterDefault);
  setFilterComments(debounce(()=>  addContent(filterComment(data)), TIMEOUT_DELAY));
  setFilterDefault(debounce(()=> addContent(filterDefault(data)), TIMEOUT_DELAY));
  setFilterRandom(debounce(()=> addContent(filterRandom(data)), TIMEOUT_DELAY));
}, showAlert);

export {onSendPhoto, createLoader};
