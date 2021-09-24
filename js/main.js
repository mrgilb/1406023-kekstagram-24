function getRandomIntInclusive(min, max) {
  if (min >= 0 && max >= 0){
    if (min>max) {
      min = [max, max = min][0]; // https://coderoad.ru/16201656/%D0%9A%D0%B0%D0%BA-%D0%BF%D0%BE%D0%BC%D0%B5%D0%BD%D1%8F%D1%82%D1%8C-%D0%BC%D0%B5%D1%81%D1%82%D0%B0%D0%BC%D0%B8-%D0%B4%D0%B2%D0%B5-%D0%BF%D0%B5%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D1%8B%D0%B5-%D0%B2-JavaScript
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //MDN
  }
}

getRandomIntInclusive(5, 1);

function checksString (checkedString, maxLenght) {
  if (checkedString.length >= maxLenght) {
    return true;
  }
  return false;
}

checksString('asdassssd', 5);

