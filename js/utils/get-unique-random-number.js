const usedIndexes = new Set();
const getUniqueRandomNumber = (callback) => {
  const newNumber = callback;
  if (usedIndexes.has(newNumber)) {
    return this.getUniqueRandomNumber(callback);
  }
  usedIndexes.add(newNumber);
  return newNumber;

};

export {getUniqueRandomNumber};
