import './render-photos.js';

const fullScreenPhotoContainer = document.querySelector('.big-picture ');
const closeButtonBigPhoto = fullScreenPhotoContainer.querySelector('.big-picture__cancel');
const bigPhotoLikes = fullScreenPhotoContainer.querySelector('.likes-count');
const body = document.querySelector('body');


const likesButton = fullScreenPhotoContainer.querySelector('.social__likes');
const likesCount = likesButton.querySelector('.likes-count');
let numberLikes = likesCount.textContent;
const buttonLoadingNewComment = fullScreenPhotoContainer.querySelector('.comments-loader');

const addingFixedCountComment = (array, maxComment) => array.slice(0, maxComment);
let quantityComment = 5;

const increaseCountComment = () => {
  quantityComment +=5;
};

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

const isEscapeKey = (evt) => evt.key === 'Escape';

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
  quantityComment = 5;
  likesButton.addEventListener('click', onAddedLikes);
  document.addEventListener('keydown', onAddedLikesKeydown);
  const bigPhotoCountComment = fullScreenPhotoContainer.querySelector('.comments-count');
  const bigPhotoDescription = fullScreenPhotoContainer.querySelector('.social__caption');
  const bigPhoto = fullScreenPhotoContainer.querySelector('img');
  const initialCommentCount = fullScreenPhotoContainer.querySelector('.initial-comments-count');

  initialCommentCount.textContent = '5';

  bigPhotoCountComment.textContent = dataUser.comments.length;
  bigPhotoDescription.textContent = dataUser.description;
  bigPhoto.src = dataUser.url;
  bigPhotoLikes.textContent = dataUser.likes;

  const containerComments = fullScreenPhotoContainer.querySelector('.social__comments');
  const listComments = dataUser.comments.map(getCommentList);
  containerComments.innerHTML = '';

  const addOneComment = (chosenComment) => {
    containerComments.appendChild(chosenComment);
  };
  const fixedListComment = addingFixedCountComment(listComments, quantityComment);
  fixedListComment.forEach(addOneComment);

  const getCanhgedListComment = () => {
    increaseCountComment();
    const newComments = addingFixedCountComment(listComments, quantityComment);
    initialCommentCount.textContent = newComments.length;
    containerComments.innerHTML = '';
    newComments.forEach(addOneComment);
  };

  buttonLoadingNewComment.addEventListener('click', getCanhgedListComment);

  const onCloseBigPhotoKeydown = (Event) => {
    if (isEscapeKey(Event)) {
      Event.preventDefault();
      fullScreenPhotoContainer.classList.add('hidden');
      likesButton.removeEventListener('click', onAddedLikes);
      body.classList.remove('modal-open');
      buttonLoadingNewComment.removeEventListener('click', getCanhgedListComment);
      document.removeEventListener('keydown', onCloseBigPhotoKeydown);
    }
  };

  closeButtonBigPhoto.addEventListener('click', () => {
    fullScreenPhotoContainer.classList.add('hidden');
    likesButton.removeEventListener('click', onAddedLikes);
    body.classList.remove('modal-open');
    buttonLoadingNewComment.removeEventListener('click', getCanhgedListComment);}, {once:true});


  document.addEventListener('keydown', onCloseBigPhotoKeydown);

  fullScreenPhotoContainer.classList.remove('hidden');
  // stringCommentDescription.classList.add('hidden');
  // buttonLoadingNewComment.classList.add('hidden');
  body.classList.add('modal-open');

  likesButton.focus();
};

export {onOpenBigPhoto, isEscapeKey, body};
