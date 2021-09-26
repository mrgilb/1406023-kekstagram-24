function getRandomIntInclusive(min, max) {
  if (min >= 0 && max >= 0){
    if (min>max) {
      min = [max, max = min][0];
    }

    if (min === max) {
      return false;
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

getRandomIntInclusive(5, 1);

function checksString (checkedString, maxLength) {
  return checkedString.length <= maxLength;
}

checksString('asdassssd', 5);

