function getSeveralRandomInt(f, min, max, q) {
  let nums = '';
  let it = 0;
  while (it !== q) {
    nums += f(min, max);
    it += 1;
  }
  return nums;
}

function genCharArray(charA, charZ) {
  const a = [];
  let i = charA.charCodeAt(0);
  const j = charZ.charCodeAt(0);

  for (; i <= j; i++) {
    a.push(String.fromCharCode(i));
  }
  return a;
}

function getRandomFromArr(arr, q, randomFunc) {
  let randomStr = '';
  let it = 0;
  let randomNum = 0;
  let randomLetter = '';

  while (it !== q) {
    randomNum = randomFunc(0, arr.length);
    randomLetter = arr[randomNum];
    randomStr += randomLetter;
    it += 1;
  }

  return randomStr;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function genNumArr(min, max) {
  const nums = [];

  for (let i = min; i <= max; i++) {
    nums.push(i);
  }
  return nums;
}

function randomizeText(num) {
  const alphabet = genCharArray('A', 'Z');
  const nums = genNumArr(0, 9);
  const numsWithAlphabet = nums.concat(alphabet);
  let randomTemp = '';
  const randomArr = [];

  for (let i = 0; i <= num; i++) {
    const firstPart = getSeveralRandomInt(getRandomInt, 0, 10, 2);
    const secondPart = getRandomFromArr(alphabet, 6, getRandomInt);
    const thirdPart = getRandomFromArr(numsWithAlphabet, 2, getRandomInt);
    const foutrhPart = getSeveralRandomInt(getRandomInt, 0, 10, 2);
    randomTemp = `${firstPart} ${secondPart} ${thirdPart} ${foutrhPart}`;
    randomArr.push(randomTemp);
  }
  return randomArr;
}


export default randomizeText;
