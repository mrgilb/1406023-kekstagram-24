import {isEscapeKey, checksString, hasDuplicates} from './utils/utils.js';
import {body} from './photo-view.js';
import {
  rangeContainer,
  addSizePhotoButton,
  reduceSizePhotoButton,
  listEffects,
  onUpdateSlider,
  getReSizePhoto,
  onAddEffect,
  closeFormEditImage
} from './editing-photo.js';
import {sendPhoto} from './new-data.js';

const MIN_HASHTAG_LENGTH = 3;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COUNT_HASHTAGS = 5;
const FIRST_SYMBOL_HASHTAG = '#';
const MAX_SYMBOLS_COMMENT = 140;
const COLOR_INVALID_INPUT = 'red';

const formUploadFile = document.querySelector('#upload-select-image');
const buttonCloseFormUploadFile = document.querySelector('#upload-cancel');
const formEditImage = document.querySelector('.img-upload__overlay');
const inputFile = document.querySelector('#upload-file');
const inputHashtags = document.querySelector('.text__hashtags');
const regularExp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const commentInput = document.querySelector('.text__description');
const buttonSendPhoto = document.querySelector('#upload-submit');


const onCloseFormEditImageKeydown = (evt) => {
  if (isEscapeKey(evt)){
    closeFormEditImage();
    document.removeEventListener('keydown', onCloseFormEditImageKeydown);
  }
};


const onCloseFormEditImage = () => {
  closeFormEditImage();
  document.removeEventListener('keydown', onCloseFormEditImageKeydown);
};


const  onOpenFormEditImage = () => {
  formEditImage.classList.remove('hidden');
  body.classList.add('modal-open');

  rangeContainer.noUiSlider.on('update',onUpdateSlider);
  addSizePhotoButton.addEventListener('click', getReSizePhoto);
  reduceSizePhotoButton.addEventListener('click', getReSizePhoto);
  listEffects.addEventListener('click',onAddEffect);
  document.addEventListener('keydown',onCloseFormEditImageKeydown);
};


const onRemoveKeyDown = () => {
  document.removeEventListener('keydown', onCloseFormEditImageKeydown);
};


const  onAddKeyDown = () => {
  document.addEventListener('keydown', onCloseFormEditImageKeydown);
};

const addInfoInvalidHashtag = () => {
  inputHashtags.style.outlineColor = COLOR_INVALID_INPUT;
  inputHashtags.style.borderColor = COLOR_INVALID_INPUT;
  buttonSendPhoto.disabled = true;
};

const addInfoValidHashtag = () => {
  inputHashtags.removeAttribute('style');
  buttonSendPhoto.disabled = false;
};


const checkOneHashtag = (oneHashtag) => {
  const lengthHashtag = String(oneHashtag).length;
  if (!oneHashtag.startsWith(FIRST_SYMBOL_HASHTAG, 0)) {
    inputHashtags.setCustomValidity(`Первый символ должен быть ${FIRST_SYMBOL_HASHTAG}`);
    addInfoInvalidHashtag();
  }
  else  if(String(oneHashtag) === FIRST_SYMBOL_HASHTAG) {
    inputHashtags.setCustomValidity(`Хештег не может содержать только ${FIRST_SYMBOL_HASHTAG}`);
    addInfoInvalidHashtag();
  }
  else if (!regularExp.test(oneHashtag)) {
    inputHashtags.setCustomValidity('Хештег может содержать только латинские и кириллические буквы.');
    addInfoInvalidHashtag();
  }
  else if (lengthHashtag > MAX_HASHTAG_LENGTH) {
    inputHashtags.setCustomValidity(`Хештег должен быть не длиннее ${MAX_HASHTAG_LENGTH}`);
    inputHashtags.style.outlineColor = COLOR_INVALID_INPUT;
    inputHashtags.style.borderColor = COLOR_INVALID_INPUT;
    buttonSendPhoto.disabled = true;
    if(String(oneHashtag) === FIRST_SYMBOL_HASHTAG) {
      inputHashtags.setCustomValidity(`Хештег не может содержать только ${FIRST_SYMBOL_HASHTAG}`);
      addInfoInvalidHashtag();
    }
  }
  else if (lengthHashtag < MIN_HASHTAG_LENGTH) {
    inputHashtags.setCustomValidity(`Хештег должен быть не короче ${MIN_HASHTAG_LENGTH - 1} симв.`);
    addInfoInvalidHashtag();
  }
  else {
    inputHashtags.setCustomValidity('');
    addInfoValidHashtag();
  }
  inputHashtags.reportValidity();
};

const getValidityHashTag = () => {
  const listHashtags = inputHashtags.value.split(' ');
  if (hasDuplicates(listHashtags)) {
    inputHashtags.setCustomValidity('Хештеги должны быть разными');
    addInfoInvalidHashtag();
  }
  else{
    listHashtags.forEach(checkOneHashtag);
    if (listHashtags.length > MAX_COUNT_HASHTAGS) {
      inputHashtags.setCustomValidity(`Хештегов может быть не более ${MAX_COUNT_HASHTAGS}`);
      addInfoInvalidHashtag();
    }
  }
  if (hasDuplicates(listHashtags)) {
    inputHashtags.setCustomValidity('Хештеги должны быть разными');
    addInfoInvalidHashtag();
  }
  if (listHashtags.includes(FIRST_SYMBOL_HASHTAG)) {
    inputHashtags.setCustomValidity(`Хештег не может содержать только ${FIRST_SYMBOL_HASHTAG}`);
    addInfoInvalidHashtag();
  }
  inputHashtags.reportValidity();
};


const getValidComment = () => {
  const string = commentInput.value;
  if (!checksString(string, MAX_SYMBOLS_COMMENT)) {
    commentInput.setCustomValidity('Комментарий должен быть не более 140 символов');
    commentInput.style.outlineColor = COLOR_INVALID_INPUT;
    commentInput.style.borderColor = COLOR_INVALID_INPUT;
  }
  else {
    commentInput.setCustomValidity('');
    commentInput.removeAttribute('style');
  }
  commentInput.reportValidity();
};

buttonCloseFormUploadFile.addEventListener('click', onCloseFormEditImage);

commentInput.addEventListener('input', getValidComment);
commentInput.addEventListener('focus', onRemoveKeyDown);
commentInput.addEventListener('blur', onAddKeyDown);

buttonSendPhoto.addEventListener('click', sendPhoto);

inputFile.addEventListener('input', onOpenFormEditImage);

inputHashtags.addEventListener('focus',onRemoveKeyDown);
inputHashtags.addEventListener('blur', onAddKeyDown);
inputHashtags.addEventListener('input', getValidityHashTag);


export {formEditImage, formUploadFile, onCloseFormEditImageKeydown};
