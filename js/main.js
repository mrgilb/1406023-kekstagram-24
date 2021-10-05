const  getRandomIntInclusive = (min, max) => {
  if (min >= 0 && max >= 0){
    if (min === max) {
      return max;
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (Math.max(min, max) - Math.min(min, max) + 1)) + Math.min(min, max);
  }
};

getRandomIntInclusive(5, 1);

const checksString = (checkedString, maxLength) => checkedString.length <= maxLength;


checksString('asdassssd', 5);

const DESCRIPTIONS = ['Кот дома', 'В баре', 'На прогулке', 'Сплю', 'Соус по кошачьи', 'Не доволен', 'Пельмени с рыбой', 'Кошачья мята', 'Устал', 'В горах', 'На море', ' С друзьями'];
const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.'];
const NAMES = ['Вася', 'Петя', 'Слава', 'Эля', 'Лена', 'Женя', 'Ира', 'Варя' , 'Уся' , 'Руся' ,'Катя', 'Хом', 'Гена'];
const itemsCount = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_ID_AVATAR = 1;
const MAX_ID_AVATAR = 6;

const usedIndexes = new Set();
const getUniqueRandomNumber = (callback) => {
  const newNumber = callback;
  if (usedIndexes.has(newNumber)) {
    return this.getUniqueRandomNumber(callback);
  }
  usedIndexes.add(newNumber);
  return newNumber;

};


const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];


const getComment = ()=> (
  {
    id: getUniqueRandomNumber(getRandomIntInclusive(Date.now(), Date.now()/2)),
    avatar: `img/avatar-${getRandomIntInclusive(MIN_ID_AVATAR, MAX_ID_AVATAR)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  });

const getPhotoDesc = (index)=>  ({
  id: index ,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomIntInclusive(MIN_LIKES, MAX_LIKES),
  comments: Array.from({length: getRandomIntInclusive(1, 5)}, getComment),
});


const libraryDesc = new Array(itemsCount).fill(null).map((item, index) => getPhotoDesc(index + 1));

libraryDesc;
