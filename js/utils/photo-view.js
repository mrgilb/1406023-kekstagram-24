import './render-photos.js';

const fullScreenPhotoContainer = document.querySelector('.big-picture ');
const closeButtonBigPhoto = fullScreenPhotoContainer.querySelector('.big-picture__cancel');
const bigPhoto = fullScreenPhotoContainer.querySelector('img');
const bigPhotolikes = fullScreenPhotoContainer.querySelector('.likes-count');
const bigPhotoCountComment = fullScreenPhotoContainer.querySelector('.social__comment-count');
const bigPhotoDescription = fullScreenPhotoContainer.querySelector('.social__caption');


const getReplacementSymbolInStroke = (string, replacement) => {
  const array = string.split(' ');
  array[0] = replacement;
  const newString = array.join(' ');
  return newString;
};

const likesButton = fullScreenPhotoContainer.querySelector('.social__likes');
const likesCount = likesButton.querySelector('.likes-count');
let numberLikes = likesCount.textContent;

const isEnterKey = (evt) => evt.key === 'Enter';

const onAddedLikes = (evt) => {
  numberLikes = evt.target.textContent;
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
    numberLikes = bigPhotolikes.textContent;
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
  }
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const onCloseBigPhotoKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    fullScreenPhotoContainer.classList.add('hidden');
    document.removeEventListener('keydown', onCloseBigPhotoKeydown);
    likesButton.removeEventListener('click', onAddedLikes);
  }
};

const onOpenBigPhoto = (evt) => {
  evt.preventDefault();
  fullScreenPhotoContainer.classList.remove('hidden');
  closeButtonBigPhoto.addEventListener('click', onCloseBigPhoto);
  document.addEventListener('keydown', onCloseBigPhotoKeydown);
  likesButton.addEventListener('click', onAddedLikes);
  document.addEventListener('keydown', onAddedLikesKeydown);
  const selectedMiniatureContainer = evt.currentTarget;
  const selectedMiniaturePhoto = selectedMiniatureContainer.querySelector('.picture__img');
  bigPhoto.src = selectedMiniaturePhoto.src;
  const selectedMiniatureCommentsCount = String (selectedMiniatureContainer.querySelector('.picture__comments').textContent);
  bigPhotoCountComment.textContent = getReplacementSymbolInStroke(bigPhotoCountComment.textContent, selectedMiniatureCommentsCount);
  const selectedMiniatureLikes = selectedMiniatureContainer.querySelector('.picture__likes');
  bigPhotolikes.textContent = selectedMiniatureLikes.textContent;
  /* const selectedMiniatureDescription = ; */
  bigPhotoDescription;
  likesButton.focus();
};

/* const getCommentsUser = (dataUser) => {
  const comments = dataUser.comments;
  return comments;
};

const getDescriptionMiniature = (dataUser) => {
  const description = dataUser.description;
  return description;
};

console.log(libraryDesc.map(getDescriptionMiniature)); */

/* const listUserComments = libraryDesc.map(getCommentsUser); */

/* const renderComment = (listUserComments) => {

} */

/* console.log(listUserComments); */

export {onOpenBigPhoto};


