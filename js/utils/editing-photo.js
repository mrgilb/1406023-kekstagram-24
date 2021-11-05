import '/nouislider/nouislider.js';
import {body} from './photo-view.js';
import {formUploadFile, formEditImage} from './form-upload-file.js';

const containerEditingPhoto = document.querySelector('.img-upload__preview-container');
const addSizePhotoButton = containerEditingPhoto.querySelector('.scale__control--bigger');
const reduceSizePhotoButton = containerEditingPhoto.querySelector('.scale__control--smaller');
const boxWithSize = containerEditingPhoto.querySelector('.scale__control--value');
const formForSubmiting = document.querySelector('.effect-level__value');
const fieldsetForRange = document.querySelector('.img-upload__effect-level');
const photo = containerEditingPhoto.querySelector('img');
const rangeContainer = containerEditingPhoto.querySelector('.effect-level__slider');
const listEffects = document.querySelector('.effects__list');
const defaultRadioChecked = document.querySelector('#effect-none');

let currentPositionSlider;
let sizePhoto = 1;
const noneEffect = 'effect-none';
boxWithSize.value = '100%';

fieldsetForRange.classList.add('hidden');

const getReSizePhoto = (evt) => {
  if (evt.target.matches('.scale__control--bigger')){
    if(sizePhoto < 1){
      sizePhoto += 0.25;
      photo.style.transform = `scale(${sizePhoto})`;
      boxWithSize.value = `${sizePhoto*100}%`;
    }
  }
  else if (evt.target.matches('.scale__control--smaller')){
    if(sizePhoto > 0.25){
      sizePhoto -= 0.25;
      photo.style.transform = `scale(${sizePhoto})`;
      boxWithSize.value = `${sizePhoto*100}%`;
    }
  }
};

noUiSlider.create(rangeContainer, {
  range: {
    min: 0.1,
    max: 1,
  },
  start :0.5,
  step : 0.1,
});

const effects = [
  {
    effect: 'grayscale',
    class: 'effects__preview--chrome',
    id: 'effect-chrome',
    min : 0.1,
    max : 1,
    start: 1,
    step: 0.1,
    unit : '',
  },
  {
    effect: 'sepia',
    class: 'effects__preview--sepia',
    id: 'effect-sepia',
    min : 0.1,
    max : 1,
    start: 1,
    step: 0.1,
    unit : '',
  },
  {
    effect: 'invert',
    class: 'effects__preview--marvin',
    id: 'effect-marvin',
    min : 0,
    max : 100,
    start: 100,
    step: 0.1,
    unit : '%',
  },
  {
    effect: 'blur',
    class: 'effects__preview--phobos',
    id: 'effect-phobos',
    min : 0.1,
    max : 3,
    start: 3,
    step: 0.1,
    unit : 'px',
  },
  {
    effect: 'brightness',
    class: 'effects__preview--heat',
    id: 'effect-heat',
    min : 0.1,
    max : 3,
    start: 3,
    step: 0.1,
    unit : '',
  },
  {
    id: 'effect-none',
    min : 0.1,
    max : 3,
    start: 3,
    step: 0.1,
    unit : '',
  },
];

const onUpdateSlider = (handle) => {
  for (const effect of effects) {
    const arrayClass = String(photo.classList);
    const changedEffect = effect.class;
    if (arrayClass.includes(changedEffect)) {
      currentPositionSlider = handle;
      photo.style.filter = `${effect.effect}(${currentPositionSlider}${effect.unit})`;
      formForSubmiting.value = `${effect.effect}(${currentPositionSlider}${effect.unit})`;
    }
  }
};

const onAddEffect = (evt) => {
  sizePhoto = 1;
  photo.style.transform = `scale(${sizePhoto})`;
  boxWithSize.value = `${sizePhoto*100}%`;
  for  (const effect of effects) {
    if (evt.target.id === effect.id) {
      rangeContainer.noUiSlider.updateOptions({
        range: {
          min: effect.min,
          max: effect.max,
        },
        start: effect.start,
        step: effect.step,
      });
      photo.className = '';
      photo.classList.add`(${effect.class})`;
      rangeContainer.noUiSlider.set(effect.start);
      fieldsetForRange.classList.remove('hidden');
      if (effect.id === noneEffect) {
        photo.className = '';
        photo.removeAttribute('style');
        fieldsetForRange.classList.add('hidden');
      }
    }
  }
};

const closeFormEditImage = () => {
  sizePhoto = 1;
  photo.className = '';
  photo.removeAttribute('style');
  photo.style.transform = `scale(${sizePhoto})`;
  defaultRadioChecked.checked = true;
  rangeContainer.noUiSlider.set(rangeContainer.noUiSlider.max);
  formForSubmiting.value = '';
  rangeContainer.noUiSlider.off('update',onUpdateSlider);

  fieldsetForRange.classList.add('hidden');
  formEditImage.classList.add('hidden');
  body.classList.remove('modal-open');
  rangeContainer.noUiSlider.on('update',onUpdateSlider);
  addSizePhotoButton.removeEventListener('click', getReSizePhoto);
  reduceSizePhotoButton.removeEventListener('click', getReSizePhoto);
  listEffects.removeEventListener('click',onAddEffect);
  formUploadFile.reset();
};


export {rangeContainer, addSizePhotoButton, reduceSizePhotoButton, listEffects, onUpdateSlider, getReSizePhoto,onAddEffect, closeFormEditImage};
