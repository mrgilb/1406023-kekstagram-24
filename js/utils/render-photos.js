import {onOpenBigPhoto} from './photo-view.js';


const miniature = document.querySelector('#picture').content;

const renderMiniature = (dataUser) => {
  const newMiniature = miniature.cloneNode(true);
  const imagePath = newMiniature.querySelector('.picture__img');
  const likes = newMiniature.querySelector('.picture__likes');
  const comments  = newMiniature.querySelector('.picture__comments');
  const containerNewMiniature = newMiniature.querySelector('.picture');

  imagePath.src = dataUser.url;
  likes.textContent = dataUser.likes;
  comments.textContent = dataUser.comments.length;

  containerNewMiniature.addEventListener('click', (evt) => onOpenBigPhoto(evt, dataUser));
  return newMiniature;
};

const miniatureContainer = document.querySelector('.pictures');

const addingMiniature = (chosenMiniature) => {
  miniatureContainer.appendChild(chosenMiniature);
};

const addingContent = (dataUsers) => {
  const dataBaseMiniature = dataUsers.map(renderMiniature);
  dataBaseMiniature.forEach(addingMiniature);
};


export{renderMiniature, miniatureContainer, addingMiniature, addingContent};
