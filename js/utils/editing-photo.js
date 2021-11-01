import '/nouislider/nouislider.js';

const containerEditingPhoto = document.querySelector('.img-upload__preview-container');
const addSizePhotoButton = containerEditingPhoto.querySelector('.scale__control--bigger');
const reduceSizePhotoButton = containerEditingPhoto.querySelector('.scale__control--smaller');
const boxWithSize = containerEditingPhoto.querySelector('.scale__control--value');
const formForSubmiting = document.querySelector('.effect-level__value');
const fieldsetForRange = document.querySelector('.img-upload__effect-level');
const photo = containerEditingPhoto.querySelector('img');
const rangeContainer = containerEditingPhoto.querySelector('.effect-level__slider');
const listEffects = document.querySelector('.effects__list');

let currentPositionSlider;
let sizePhoto = 1;
boxWithSize.value = '100%';


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

addSizePhotoButton.addEventListener('click', getReSizePhoto);
reduceSizePhotoButton.addEventListener('click', getReSizePhoto);


noUiSlider.create(rangeContainer, {
  range: {
    min: 0.1,
    max: 1,
  },
  start :0.5,
  step : 0.1,
});


rangeContainer.noUiSlider.on('update', (handle) => {
  currentPositionSlider = handle;
  if (photo.classList.contains('effects__preview--chrome')) {
    photo.style.filter = `grayscale(${currentPositionSlider})`;
    formForSubmiting.value = `grayscale(${currentPositionSlider})`;
  }
  else if (photo.classList.contains('effects__preview--sepia')){
    photo.style.filter = `sepia(${currentPositionSlider})`;
    formForSubmiting.value = `sepia(${currentPositionSlider})`;
  }
  else if (photo.classList.contains('effects__preview--marvin')){
    photo.style.filter = `invert(${currentPositionSlider*100}%)`;
    formForSubmiting.value = `invert(${currentPositionSlider*100}%)`;
  }
  else if (photo.classList.contains('effects__preview--phobos')){
    photo.style.filter = `blur(${currentPositionSlider}px)`;
    formForSubmiting.value = `blur(${currentPositionSlider}px)`;
  }
  else if (photo.classList.contains('effects__preview--heat')){
    photo.style.filter = `brightness(${currentPositionSlider})`;
    formForSubmiting.value = `brightness(${currentPositionSlider})`;
  }
});


const getSetEffect = (evt) => {
  if(evt.target.matches('#effect-none')){
    photo.removeAttribute('style');
    photo.className = '';
    sizePhoto = 1;
    boxWithSize.value = '100%';
    fieldsetForRange.classList.add('hidden');
  }
  else if(evt.target.matches('#effect-chrome')) {
    rangeContainer.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
    photo.className = '';
    photo.classList.add('effects__preview--chrome');
    rangeContainer.noUiSlider.set(1);
    fieldsetForRange.classList.remove('hidden');
  }
  else if(evt.target.matches('#effect-sepia')) {
    rangeContainer.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
    photo.className = '';
    photo.classList.add('effects__preview--sepia');
    rangeContainer.noUiSlider.set(1);
    fieldsetForRange.classList.remove('hidden');
  }
  else if(evt.target.matches('#effect-marvin')) {
    rangeContainer.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
    photo.className = '';
    photo.classList.add('effects__preview--marvin');
    rangeContainer.noUiSlider.set(1);
    fieldsetForRange.classList.remove('hidden');
  }
  else if(evt.target.matches('#effect-phobos')) {
    rangeContainer.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    photo.className = '';
    photo.classList.add('effects__preview--phobos');
    rangeContainer.noUiSlider.set(3);
    fieldsetForRange.classList.remove('hidden');
  }
  else if(evt.target.matches('#effect-heat')) {
    rangeContainer.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    photo.className = '';
    photo.classList.add('effects__preview--heat');
    rangeContainer.noUiSlider.set(3);
    fieldsetForRange.classList.remove('hidden');
  }

};


listEffects.addEventListener('click',getSetEffect );

export {addSizePhotoButton, reduceSizePhotoButton, getReSizePhoto};

