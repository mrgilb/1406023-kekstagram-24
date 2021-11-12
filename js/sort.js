const MAX_RANDOM_COUNT_MINIATURE = 10;

const filtersContainer = document.querySelector('.img-filters');
const filterCommentsButton = filtersContainer.querySelector('#filter-discussed');
const filterRandomButton = filtersContainer.querySelector('#filter-random');
const filterDefaultButton = filtersContainer.querySelector('#filter-default');
const buttonsSetFilter = filtersContainer.querySelectorAll('.img-filters__button');

const showFilters = () => filtersContainer.classList.remove('img-filters--inactive');


const setActiveButton = () => {
  for (const button of buttonsSetFilter) {
    if (button.classList.contains('img-filters__button--active')) {
      button.classList.remove('img-filters__button--active');
    }
  }
};


const compareComment = (elementA, elementB) => {
  const countA = elementA.comments.length;
  const countB = elementB.comments.length;
  return countB - countA;
};


const filterComment = (dataUsers) => dataUsers.sort(compareComment);


const compareId = (elementA, elementB) => {
  const countA = elementA.id;
  const countB = elementB.id;
  return countA - countB;
};


const filterDefault = (dataUsers) => {
  const sortedData = dataUsers.sort(compareId);
  return sortedData;
};


const filterRandom = (dataUsers) => {
  const sortedData = dataUsers.sort(() => Math.random() - Math.random()).slice(0, MAX_RANDOM_COUNT_MINIATURE);
  return sortedData;
};


const setFilterComments = (cb) => {
  filterCommentsButton.addEventListener('click', (evt) => {
    if(evt.target.matches('#filter-discussed')){
      setActiveButton();
      evt.target.classList.add('img-filters__button--active');
      cb();
    }
  });
};


const setFilterDefault = (cb) => {
  filterDefaultButton.addEventListener('click', (evt) => {
    if(evt.target.matches('#filter-default')){
      setActiveButton();
      evt.target.classList.add('img-filters__button--active');
      cb();
    }
  });
};


const setFilterRandom = (cb) => {
  filterRandomButton.addEventListener('click', (evt) => {
    if(evt.target.matches('#filter-random')){
      setActiveButton();
      evt.target.classList.add('img-filters__button--active');
      cb();
    }
  });
};


export {filterDefault,
  filterComment,
  filterCommentsButton,
  filterRandomButton,
  filterDefaultButton,
  showFilters,
  setActiveButton,
  filterRandom,
  setFilterComments,
  setFilterDefault,
  setFilterRandom};
