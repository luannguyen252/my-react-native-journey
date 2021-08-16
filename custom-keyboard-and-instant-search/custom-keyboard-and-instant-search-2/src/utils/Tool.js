export const numberWithCommas = (number) => {
  try {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  } catch (error) {
    return number;
  }
};
