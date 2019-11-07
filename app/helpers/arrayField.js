exports.orderArrayByField = (array, order) =>
  order === 'ASC'
    ? array.sort((a, b) => (a.price >= b.price ? 1 : -1))
    : array.sort((a, b) => (b.price >= a.price ? 1 : -1));

exports.searchArray = (array, query, name) => array.find(element => element[query] === name);
