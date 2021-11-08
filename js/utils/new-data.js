import {addingContent} from './render-photos.js';
import {showAlert, showSuccessfulPost, showUnsuccessfulPost} from './allerts.js';
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


createLoader((data) => {
  addingContent(data, filterDefault);
  setFilterComments(()=> addingContent(filterComment(data)));
  setFilterDefault(()=> addingContent(filterDefault(data)));
  setFilterRandom(()=> addingContent(filterRandom(data)));
}, showAlert).then(showFilters);


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

export {sendPhoto, createLoader};
