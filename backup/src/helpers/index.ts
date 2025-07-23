export const numberWithCommas: (input: number) => string = (input) =>
  input ? input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';

export const insertItemAtIndex: <T>(array: Array<T>, item: T, index: number) => Array<T> = (array, item, index) => [
  ...array.slice(0, index),
  item,
  ...array.slice(index),
];

export const getRandomItemFromArray: <T>(array: Array<T>) => T = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};