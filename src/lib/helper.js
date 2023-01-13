const shuffle = arr => {
  let currI = arr.length,
    randI;

  while (currI !== 0) {
    randI = Math.floor(Math.random() * currI);
    currI--;

    [arr[currI], arr[randI]] = [arr[randI], arr[currI]];
  }

  return arr;
};

exports = { shuffle };
