function getRandomIntInclusive(min, max) {
  if (min >= 0 && max >= 0){
    if (min === max) {
      return false;
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (Math.max(min, max) - Math.min(min, max) + 1)) + Math.min(min, max);
  }
}

getRandomIntInclusive(5, 1);

function checksString (checkedString, maxLength) {
  return checkedString.length <= maxLength;
}

checksString('asdassssd', 5);

const DESCRIPTIONS = ['Кот дома', 'В баре', 'На прогулке', 'Сплю', 'Соус по кошачьи', 'Не доволен', 'Пельмени с рыбой', 'Кошачья мята', 'Устал', 'В горах', 'На море', ' С друзьями'];
const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.'];
const NAMES = ['Вася', 'Петя', 'Слава', 'Эля', 'Лена', 'Женя', 'Ира', 'Варя' , 'Уся' , 'Руся' ,'Катя', 'Хом', 'Гена'];
const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

const usedIndexes = new Set();
function getUniqueRandomNumber(callback) {
  const newNumber = callback;
  if (usedIndexes.has(newNumber)) {
    return this.getUniqueRandomNumber(callback);
  } else {
    usedIndexes.add(newNumber);
    return newNumber;
  }
}


const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];


const getComment = ()=> (
  {
    id: getUniqueRandomNumber(getRandomIntInclusive(Date.now(), Date.now()/2)),
    avatar: `img/avatar-${getRandomIntInclusive(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES), name: getRandomArrayElement(NAMES),
  });

const getPhotoDesc = (index)=>  ({
  id: index ,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomIntInclusive(15, 200),
  comments: Array.from({length: getRandomIntInclusive(1, 5)}, getComment),
});


const libraryDesc = new Array(ids.length).fill(null).map((item, index) => getPhotoDesc(index));

libraryDesc;
