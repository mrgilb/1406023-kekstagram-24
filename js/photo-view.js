import './render-photos.js';
import {isEscapeKey, isEnterKey} from './utils/utils.js';


const fullScreenPhotoContainer = document.querySelector('.big-picture ');
const closeButtonBigPhoto = fullScreenPhotoContainer.querySelector('.big-picture__cancel');
const bigPhotoLikes = fullScreenPhotoContainer.querySelector('.likes-count');
const body = document.querySelector('body');
const likesButton = fullScreenPhotoContainer.querySelector('.social__likes');
const likesCount = likesButton.querySelector('.likes-count');
const buttonLoadingNewComment = fullScreenPhotoContainer.querySelector('.comments-loader');
const bigPhotoCountComment = fullScreenPhotoContainer.querySelector('.comments-count');
const bigPhotoDescription = fullScreenPhotoContainer.querySelector('.social__caption');
const bigPhoto = fullScreenPhotoContainer.querySelector('img');
const initialCommentCount = fullScreenPhotoContainer.querySelector('.initial-comments-count');
const containerComments = fullScreenPhotoContainer.querySelector('.social__comments');
let numberLikes = likesCount.textContent;
let currentCommentsList;
let quantityComment = 5;

const addingFixedCountComment = (array, maxComment) => array.slice(0, maxComment);


const increaseCountComment = () => {
  quantityComment +=5;
};

const addLikes = () => {
  numberLikes = bigPhotoLikes.textContent;
  if (likesCount.classList.contains('likes-count--active')) {
    numberLikes--;
  }
  else {
    numberLikes++;
  }

  likesCount.textContent = numberLikes;
  likesCount.classList.toggle('likes-count--active');
};


const onAddedLikes = (evt) => {
  evt.preventDefault();
  addLikes();
};


const onAddedLikesKeydown = (evt) => {
  if (isEnterKey(evt)) {
    evt.preventDefault();
    addLikes();
  }
};


const getCommentList = (elementDataBase) => {
  const itemList = document.createElement('li');
  const avatar = document.createElement('img');
  const textComment = document.createElement('p');
  itemList.classList.add('social__comment');
  avatar.classList.add('social__picture');
  textComment.classList.add('social__text');
  itemList.appendChild(avatar);
  itemList.appendChild(textComment);
  avatar.src = elementDataBase.avatar;
  textComment.textContent = elementDataBase.message;
  return itemList;
};


const addOneComment = (chosenComment) => {
  containerComments.appendChild(chosenComment);
};


const getChangedListComment = (evt, array) => {
  evt.preventDefault();
  increaseCountComment();
  const newComments = addingFixedCountComment(array, quantityComment);
  initialCommentCount.textContent = newComments.length;
  if (array.length === newComments.length){
    buttonLoadingNewComment.classList.add('hidden');
  }
  containerComments.innerHTML = '';
  newComments.forEach(addOneComment);
};


const onChangedList = (evt) => getChangedListComment(evt, currentCommentsList);


const closeBigPhoto = () => {
  fullScreenPhotoContainer.classList.add('hidden');
  likesButton.removeEventListener('click', onAddedLikes);
  body.classList.remove('modal-open');
  buttonLoadingNewComment.removeEventListener('click', onChangedList);
  document.removeEventListener('keydown', onAddedLikesKeydown);
};


const onCloseBigPhotoKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeBigPhoto();
    document.removeEventListener('keydown', onCloseBigPhotoKeydown);
  }
};


const onCloseBigPhoto = (evt) => {
  evt.preventDefault();
  closeBigPhoto();
  document.removeEventListener('keydown', onCloseBigPhotoKeydown);
};


const onOpenBigPhoto = (evt, dataUser) => {
  evt.preventDefault();
  if (dataUser.comments.length < 5) {
    quantityComment = dataUser.comments.length;
    buttonLoadingNewComment.classList.add('hidden');
  }
  else {
    quantityComment = 5;
    buttonLoadingNewComment.classList.remove('hidden');
  }
  initialCommentCount.textContent = String(quantityComment);
  bigPhotoCountComment.textContent = dataUser.comments.length;
  bigPhotoDescription.textContent = dataUser.description;
  bigPhoto.src = dataUser.url;
  bigPhotoLikes.textContent = dataUser.likes;

  currentCommentsList = dataUser.comments.map(getCommentList);
  containerComments.innerHTML = '';

  const fixedListOfComments = addingFixedCountComment(currentCommentsList, quantityComment);
  fixedListOfComments.forEach(addOneComment);
  buttonLoadingNewComment.addEventListener('click', onChangedList);
  likesButton.addEventListener('click', onAddedLikes);
  document.addEventListener('keydown', onAddedLikesKeydown);
  closeButtonBigPhoto.addEventListener('click', onCloseBigPhoto, {once:true});
  document.addEventListener('keydown', onCloseBigPhotoKeydown);


  fullScreenPhotoContainer.classList.remove('hidden');
  body.classList.add('modal-open');
  likesButton.focus();
};


export {onOpenBigPhoto, isEscapeKey, body};
