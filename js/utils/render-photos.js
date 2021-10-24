import {libraryDesc} from './data.js';
import {onOpenBigPhoto} from './photo-view.js';

const miniature = document.querySelector('#picture').content;

const renderMiniature = (dataUser) => {
  const newMiniature = miniature.cloneNode(true);
  const imagePath = newMiniature.querySelector('.picture__img');
  const likes = newMiniature.querySelector('.picture__likes');
  const comments  = newMiniature.querySelector('.picture__comments');
  const containerNewMiniuature = newMiniature.querySelector('.picture');
  imagePath.src = dataUser.url;
  likes.textContent = dataUser.likes;
  comments.textContent = dataUser.comments.length;
  containerNewMiniuature.addEventListener('click', onOpenBigPhoto);
  return newMiniature;
};

const dataBaseMiniature = libraryDesc.map(renderMiniature);
const miniatureContainer = document.querySelector('.pictures');

const addingMiniature = (chosenMiniature) => {
  miniatureContainer.appendChild(chosenMiniature);
};

dataBaseMiniature.forEach(addingMiniature);

export{renderMiniature};
