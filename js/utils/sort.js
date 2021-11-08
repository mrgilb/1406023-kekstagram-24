const filtersContainer = document.querySelector('.img-filters');
const filterButtons = filtersContainer.querySelector('.img-filters__form');
const buttonsSetFilter = filtersContainer.querySelectorAll('.img-filters__button');

const showFilters = () => filtersContainer.classList.remove('img-filters--inactive');

const MAX_RANDOM_COUNT_MINIATURE = 10;

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

const filterComment = (dataUsers) => {
  const sortedData = dataUsers.sort(compareComment);
  return sortedData;
};

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

export {filterDefault, filterComment, filterButtons, showFilters, setActiveButton, filterRandom};
