const doNTimes = (n, cb) => Array(n).fill().map(cb);
const capit = s => s.charAt(0).toUpperCase() + s.slice(1);

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

export { doNTimes, shuffle, capit };
