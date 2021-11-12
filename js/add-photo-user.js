import {inputFile} from './form-upload-file.js';
import {photo} from './editing-photo.js';


const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const onAddFile = () => {
  const file = inputFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    photo.src = URL.createObjectURL(file);
  }
};


inputFile.addEventListener('change', onAddFile);

