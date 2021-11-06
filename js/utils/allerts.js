import {body} from './photo-view.js';
import  {isEscapeKey} from './photo-view.js';

const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {showAlert};

const containerShowSuccessfulPost = document.querySelector('#success').content;


const showSuccessfulPost = () => {
  const newAllert = containerShowSuccessfulPost.cloneNode(true);
  const containerNewAllert = newAllert.querySelector('.success');
  const cancelButtonSuccessfulAllert = newAllert.querySelector('.success__button');


  const onKeydownCloseAllert = (evt) => {
    if (isEscapeKey(evt)) {
      containerNewAllert.remove();
      document.removeEventListener('keydown', onKeydownCloseAllert);
    }
  };

  const onClickCloseAllert = (evt) => {
    if (evt.target.matches('.success')) {
      containerNewAllert.remove();
      document.removeEventListener('keydown', onKeydownCloseAllert);
    }
  };

  const onClickButtonAllert = (evt) => {
    evt.preventDefault();
    containerNewAllert.remove();
    document.removeEventListener('keydown', onKeydownCloseAllert);
  };

  body.appendChild(newAllert);
  document.addEventListener('keydown', onKeydownCloseAllert);
  containerNewAllert.addEventListener('click', onClickCloseAllert);
  cancelButtonSuccessfulAllert.addEventListener('click', onClickButtonAllert);
};

export {showSuccessfulPost};

const sampleUnsuccessfulAllert = document.querySelector('#error').content;

const showUnsuccessfulPost = () => {
  const newUnsuccessfulAllert = sampleUnsuccessfulAllert.cloneNode(true);
  const containerUnsuccessfulAllert = newUnsuccessfulAllert.querySelector('.error');
  const cancelButtonUnsuccessfulAllert = newUnsuccessfulAllert.querySelector('.error__button');


  const onKeydownCloseUnsuccessfulAllert = (evt) => {
    if (isEscapeKey(evt)) {
      containerUnsuccessfulAllert.remove();
      document.removeEventListener('keydown', onKeydownCloseUnsuccessfulAllert);
    }
  };

  const onClickCloseUnsuccessfulAllert = (evt) => {
    if (evt.target.matches('.error')) {
      containerUnsuccessfulAllert.remove();
      document.removeEventListener('keydown', onKeydownCloseUnsuccessfulAllert);
    }
  };

  const onClickButtonUnsuccessfulAllert = (evt) => {
    evt.preventDefault();
    containerUnsuccessfulAllert.remove();
    document.removeEventListener('keydown', onKeydownCloseUnsuccessfulAllert);
  };


  body.appendChild(newUnsuccessfulAllert);
  document.addEventListener('keydown', onKeydownCloseUnsuccessfulAllert);
  containerUnsuccessfulAllert.addEventListener('click', onClickCloseUnsuccessfulAllert);
  cancelButtonUnsuccessfulAllert.addEventListener('click', onClickButtonUnsuccessfulAllert);
};

export {showUnsuccessfulPost};

