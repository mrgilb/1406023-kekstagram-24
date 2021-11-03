import {isEscapeKey} from './photo-view.js';
import {checksString} from './check-string-length.js';
import {body} from './photo-view.js';
import {
  rangeContainer,
  addSizePhotoButton,
  reduceSizePhotoButton,
  listEffects,
  onUpdateSlider,
  getReSizePhoto,
  onAddEffect,
  boxWithSize,
  closeFormEditImage, sizePhoto
} from './editing-photo.js';

const MIN_HASHTAG_LENGTH = 3;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COUNT_HASHTAGS = 5;
const FIRST_SYMBOL_HASHTAG = '#';
const MAX_SYMBOLS_COMMENT = 140;

const formUploadFile = document.querySelector('#upload-select-image');
const buttonCloseFormUploadFile = document.querySelector('#upload-cancel');
const formEditImage = document.querySelector('.img-upload__overlay');
const inputFile = document.querySelector('#upload-file');
const inputHashtags = document.querySelector('.text__hashtags');
const regularExp = /[A-Za-zА-Яа-яЁё0-9]$/;
const commentInput = document.querySelector('.text__description');

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


buttonCloseFormUploadFile.addEventListener('click', onCloseFormEditImage);


const  onOpenFormEditImage = () => {
  formEditImage.classList.remove('hidden');
  body.classList.add('modal-open');
  boxWithSize.value = `${sizePhoto*100}%`;

  rangeContainer.noUiSlider.on('update',onUpdateSlider);
  addSizePhotoButton.addEventListener('click', getReSizePhoto);
  reduceSizePhotoButton.addEventListener('click', getReSizePhoto);
  listEffects.addEventListener('click',onAddEffect);
  document.addEventListener('keydown',onCloseFormEditImageKeydown);
};

inputFile.addEventListener('input', onOpenFormEditImage);


// const buttonUploadComment = document.querySelector('#upload-submit');

const onRemoveKeyDown = () => {
  document.removeEventListener('keydown', onCloseFormEditImageKeydown);
};

const  onAddKeyDown = () => {
  document.addEventListener('keydown', onCloseFormEditImageKeydown);
};

inputHashtags.addEventListener('focus',onRemoveKeyDown);
inputHashtags.addEventListener('blur', onAddKeyDown);

const checkOneHashtag = (oneHashtag) => {
  const lengthHashtag = String(oneHashtag).length;
  if (!oneHashtag.startsWith(FIRST_SYMBOL_HASHTAG, 0)) {
    inputHashtags.setCustomValidity(`Первый символ должен быть ${FIRST_SYMBOL_HASHTAG}`);
  }
  else  if(String(oneHashtag) === FIRST_SYMBOL_HASHTAG) {
    inputHashtags.setCustomValidity(`Хештег не может содержать только ${FIRST_SYMBOL_HASHTAG}`);
  }
  else if (!regularExp.test(oneHashtag)) {
    inputHashtags.setCustomValidity('Хештег может содержать только латинские и кириллические буквы.');
  }
  else if (lengthHashtag > MAX_HASHTAG_LENGTH) {
    inputHashtags.setCustomValidity(`Хештег должен быть не длиннее ${MAX_HASHTAG_LENGTH}`);
    if(String(oneHashtag) === FIRST_SYMBOL_HASHTAG) {
      inputHashtags.setCustomValidity(`Хештег не может содержать только ${FIRST_SYMBOL_HASHTAG}`);
    }
  }
  else if (lengthHashtag < MIN_HASHTAG_LENGTH) {
    inputHashtags.setCustomValidity(`Хештег должен быть не короче ${MIN_HASHTAG_LENGTH - 1} симв.`);
  }
  else {
    inputHashtags.setCustomValidity('');
  }
  inputHashtags.reportValidity();
};

const getLowerCase = (element) => String(element.toLowerCase());

const hasDuplicates = (array) => {
  const newArray = array.map(getLowerCase);
  return (new Set(newArray)).size !== newArray.length;
};

const getValidityHashTag = () => {
  const listHashtags = inputHashtags.value.split(' ');
  if (hasDuplicates(listHashtags)) {
    inputHashtags.setCustomValidity('Хештеги должны быть разными');
  }
  else{
    listHashtags.forEach(checkOneHashtag);
    if (listHashtags.length > MAX_COUNT_HASHTAGS) {
      inputHashtags.setCustomValidity(`Хештегов может быть не более ${MAX_COUNT_HASHTAGS}`);
    }
  }
  if (hasDuplicates(listHashtags)) {
    inputHashtags.setCustomValidity('Хештеги должны быть разными');
  }
  if (listHashtags.includes(FIRST_SYMBOL_HASHTAG)) {
    inputHashtags.setCustomValidity(`Хештег не может содержать только ${FIRST_SYMBOL_HASHTAG}`);
  }
  inputHashtags.reportValidity();
};

inputHashtags.addEventListener('input', getValidityHashTag);

const getValidComment = () => {
  const string = commentInput.value;
  if (!checksString(string, MAX_SYMBOLS_COMMENT)) {
    commentInput.setCustomValidity('Комментарий должен быть не более 140 символов');
  }
  else {
    commentInput.setCustomValidity('');}
  commentInput.reportValidity();
};

commentInput.addEventListener('input', getValidComment);
commentInput.addEventListener('focus', onRemoveKeyDown);
commentInput.addEventListener('blur', onAddKeyDown);


export {formEditImage, formUploadFile};
