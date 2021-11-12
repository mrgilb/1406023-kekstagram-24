const checksString = (checkedString, maxLength) => checkedString.length <= maxLength;

const isEnterKey = (evt) => evt.key === 'Enter';

const isEscapeKey = (evt) => evt.key === 'Escape';

const getLowerCase = (element) => String(element.toLowerCase());

const hasDuplicates = (array) => {
  const lowercaseStrings = array.map(getLowerCase);
  return (new Set(lowercaseStrings)).size !== lowercaseStrings.length;
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {isEscapeKey, isEnterKey, checksString, hasDuplicates, debounce};
