export const changeTimeFormat = (number: number) => {
  return number > 9 ? String(number) : `0${number}`;
};
