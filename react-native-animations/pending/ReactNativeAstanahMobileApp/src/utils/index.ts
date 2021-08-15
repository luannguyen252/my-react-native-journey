export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const discountPrecentage = (original: number, sale: number) => {
  const percentage = (sale / original) * 100;
  return percentage.toFixed();
};
