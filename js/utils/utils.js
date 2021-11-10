const checksString = (checkedString, maxLength) => checkedString.length <= maxLength;

const isEnterKey = (evt) => evt.key === 'Enter';

const isEscapeKey = (evt) => evt.key === 'Escape';

const getLowerCase = (element) => String(element.toLowerCase());

const hasDuplicates = (array) => {
  const newArray = array.map(getLowerCase);
  return (new Set(newArray)).size !== newArray.length;
};

function debounce (callback, timeoutDelay) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {isEscapeKey, isEnterKey, checksString, hasDuplicates, debounce};
