import {body} from './photo-view.js';
import  {isEscapeKey} from './utils/utils.js';

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


const containerShowSuccessfulPost = document.querySelector('#success').content;
const sampleUnsuccessfulAlert = document.querySelector('#error').content;


const showSuccessfulPost = () => {
  const newAlert = containerShowSuccessfulPost.cloneNode(true);
  const containerNewAlert = newAlert.querySelector('.success');
  const cancelButtonSuccessfulAlert = newAlert.querySelector('.success__button');


  const onKeydownCloseAlert = (evt) => {
    if (isEscapeKey(evt)) {
      containerNewAlert.remove();
      document.removeEventListener('keydown', onKeydownCloseAlert);
    }
  };

  const onClickCloseAlert = (evt) => {
    if (evt.target.matches('.success')) {
      containerNewAlert.remove();
      document.removeEventListener('keydown', onKeydownCloseAlert);
    }
  };

  const onClickButtonAlert = (evt) => {
    evt.preventDefault();
    containerNewAlert.remove();
    document.removeEventListener('keydown', onKeydownCloseAlert);
  };

  body.appendChild(newAlert);
  document.addEventListener('keydown', onKeydownCloseAlert);
  containerNewAlert.addEventListener('click', onClickCloseAlert);
  cancelButtonSuccessfulAlert.addEventListener('click', onClickButtonAlert);
};


const showUnsuccessfulPost = () => {
  const newUnsuccessfulAlert = sampleUnsuccessfulAlert.cloneNode(true);
  const containerUnsuccessfulAlert = newUnsuccessfulAlert.querySelector('.error');
  const cancelButtonUnsuccessfulAlert = newUnsuccessfulAlert.querySelector('.error__button');


  const onKeydownCloseUnsuccessfulAlert = (evt) => {
    if (isEscapeKey(evt)) {
      containerUnsuccessfulAlert.remove();
      document.removeEventListener('keydown', onKeydownCloseUnsuccessfulAlert);
    }
  };

  const onClickCloseUnsuccessfulAllert = (evt) => {
    if (evt.target.matches('.error')) {
      containerUnsuccessfulAlert.remove();
      document.removeEventListener('keydown', onKeydownCloseUnsuccessfulAlert);
    }
  };

  const onClickButtonUnsuccessfulAllert = (evt) => {
    evt.preventDefault();
    containerUnsuccessfulAlert.remove();
    document.removeEventListener('keydown', onKeydownCloseUnsuccessfulAlert);
  };


  body.appendChild(newUnsuccessfulAlert);
  document.addEventListener('keydown', onKeydownCloseUnsuccessfulAlert);
  containerUnsuccessfulAlert.addEventListener('click', onClickCloseUnsuccessfulAllert);
  cancelButtonUnsuccessfulAlert.addEventListener('click', onClickButtonUnsuccessfulAllert);
};


export {showAlert, showSuccessfulPost, showUnsuccessfulPost};

