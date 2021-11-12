const checksString = (checkedString, maxLength) => checkedString.length <= maxLength;

const isEnterKey = (evt) => evt.key === 'Enter';

const isEscapeKey = (evt) => evt.key === 'Escape';

const getLowerCase = (element) => String(element.toLowerCase());

const hasDuplicates = (Strings) => {
  const lowerCaseStrings = Strings.map(getLowerCase);
  return (new Set(lowerCaseStrings)).size !== lowerCaseStrings.length;
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {isEscapeKey, isEnterKey, checksString, hasDuplicates, debounce};
