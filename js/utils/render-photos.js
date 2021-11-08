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

const clearMiniatures = () => {
  const miniaturesLabel = miniatureContainer.querySelectorAll('.picture');
  for (const miniatureItem of miniaturesLabel) {
    miniatureContainer.removeChild(miniatureItem);
  }
};


const addingContent = (dataUsers, filterMethod) => {
  clearMiniatures();
  const copyData = dataUsers.slice();
  const filteredData = filterMethod(copyData);
  const dataBaseMiniature = filteredData.map(renderMiniature);
  dataBaseMiniature.forEach(addingMiniature);
};


export{renderMiniature, miniatureContainer, addingMiniature, addingContent};
