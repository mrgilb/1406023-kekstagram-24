import {isEscapeKey} from './photo-view.js';
import {checksString} from './check-string-length.js';

const formUploadFile = document.querySelector('#upload-file');
const buttonCloseFormUploadFile = document.querySelector('#upload-cancel');
const formEditImage = document.querySelector('.img-upload__overlay');

const onCloseFormEditImage = () => {
  formEditImage.classList.add('hidden');
  formUploadFile.reset();
};

const onCloseFormEditImageKeydown = (evt) => {
  if (isEscapeKey(evt)){
    formEditImage.classList.add('hidden');
    formUploadFile.reset();
  }
};

buttonCloseFormUploadFile.addEventListener('click', onCloseFormEditImage);
document.addEventListener('keydown',onCloseFormEditImageKeydown);


const inputHashtags = document.querySelector('.text__hashtags');
// const buttonUploadComment = document.querySelector('#upload-submit');
const regularExp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const onRemoveKeyDown = () => {
  document.removeEventListener('keydown', onCloseFormEditImageKeydown);
};

const  onAddKeyDown = () => {
  document.addEventListener('keydown', onCloseFormEditImageKeydown);
};

inputHashtags.addEventListener('focus',onRemoveKeyDown);
inputHashtags.addEventListener('blur', onAddKeyDown);


const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COUNT_HASHTAGS = 5;
const FIRST_SYMBOL_HASHTAG = '#';

const checkOneHashtag = (oneHashtag) => {
  const lengthHashtag = oneHashtag.length;
  if (!oneHashtag.startsWith(FIRST_SYMBOL_HASHTAG, 0)) {
    inputHashtags.setCustomValidity(`Первый символ должен быть ${FIRST_SYMBOL_HASHTAG}`);
  }
  else if (lengthHashtag < MIN_HASHTAG_LENGTH) {
    inputHashtags.setCustomValidity(`Хештег должен быть не короче ${MIN_HASHTAG_LENGTH} симв.`);
  }
  else if (!regularExp.test(oneHashtag)) {
    inputHashtags.setCustomValidity('Хештег может содержать только латинские и кириллические буквы, а так же цифры');
  }
  else if (lengthHashtag > MAX_HASHTAG_LENGTH) {
    inputHashtags.setCustomValidity(`Хештег должен быть не длиннее ${MAX_HASHTAG_LENGTH}`);
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

const onValidityHashTag = () => {
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
  inputHashtags.reportValidity();
};

inputHashtags.addEventListener('input', onValidityHashTag);

const commentInput = document.querySelector('.text__description');
const MAX_SYMBOLS_COMMENT = 140;

const onValidComment = () => {
  const string = commentInput.value;
  if (!checksString(string, MAX_SYMBOLS_COMMENT)) {
    commentInput.setCustomValidity('Комментарий должен быть не более 140 символов');
  }
  else {
    commentInput.setCustomValidity('');}
  commentInput.reportValidity();
};

commentInput.addEventListener('input', onValidComment);
commentInput.addEventListener('focus', onRemoveKeyDown);
commentInput.addEventListener('blur', onAddKeyDown);

