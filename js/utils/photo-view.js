import './render-photos.js';

const fullScreenPhotoContainer = document.querySelector('.big-picture ');
const closeButtonBigPhoto = fullScreenPhotoContainer.querySelector('.big-picture__cancel');
const bigPhotoLikes = fullScreenPhotoContainer.querySelector('.likes-count');
const body = document.querySelector('body');


const likesButton = fullScreenPhotoContainer.querySelector('.social__likes');
const likesCount = likesButton.querySelector('.likes-count');
let numberLikes = likesCount.textContent;

const isEnterKey = (evt) => evt.key === 'Enter';

const onAddedLikes = () => {
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

const onAddedLikesKeydown = (evt) => {
  if (isEnterKey(evt)) {
    numberLikes = bigPhotoLikes.textContent;
    if (likesCount.classList.contains('likes-count--active')) {
      numberLikes--;
    }
    else {
      numberLikes++;
    }

    likesCount.textContent = numberLikes;
    likesCount.classList.toggle('likes-count--active');
  }
};


const onCloseBigPhoto = (evt) => {
  if (evt.target.matches('.big-picture__cancel')) {
    fullScreenPhotoContainer.classList.add('hidden');
    closeButtonBigPhoto.removeEventListener('click', onCloseBigPhoto);
    likesButton.removeEventListener('click', onAddedLikes);
    body.classList.remove('modal-open');
  }
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const onCloseBigPhotoKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    fullScreenPhotoContainer.classList.add('hidden');
    document.removeEventListener('keydown', onCloseBigPhotoKeydown);
    likesButton.removeEventListener('click', onAddedLikes);
    body.classList.remove('modal-open');
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

const onOpenBigPhoto = (evt, dataUser) => {
  evt.preventDefault();
  closeButtonBigPhoto.addEventListener('click', onCloseBigPhoto);
  document.addEventListener('keydown', onCloseBigPhotoKeydown);
  likesButton.addEventListener('click', onAddedLikes);
  document.addEventListener('keydown', onAddedLikesKeydown);

  const bigPhotoCountComment = fullScreenPhotoContainer.querySelector('.comments-count');
  const bigPhotoDescription = fullScreenPhotoContainer.querySelector('.social__caption');
  const bigPhoto = fullScreenPhotoContainer.querySelector('img');
  const stringCommentDescription = fullScreenPhotoContainer.querySelector('.social__comment-count');
  const formLoadingNewComment = fullScreenPhotoContainer.querySelector('.comments-loader');

  /* stringCommentDescription.textContent = `${dataUser.comments.length} из ${dataUser.comments.length} комментариев`; */
  bigPhotoCountComment.textContent = dataUser.comments.length;
  bigPhotoDescription.textContent = dataUser.description;
  bigPhoto.src = dataUser.url;
  bigPhotoLikes.textContent = dataUser.likes;

  const containerComments = fullScreenPhotoContainer.querySelector('.social__comments');
  const listComments = dataUser.comments.map(getCommentList);
  containerComments.innerHTML = '';
  const addingComments = (chosenComment) => {
    containerComments.appendChild(chosenComment);
  };
  listComments.forEach(addingComments);

  fullScreenPhotoContainer.classList.remove('hidden');
  stringCommentDescription.classList.add('hidden');
  formLoadingNewComment.classList.add('hidden');
  body.classList.add('modal-open');

  likesButton.focus();
};

export {onOpenBigPhoto};


