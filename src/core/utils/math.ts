export const round = (number: number, decimals: number): number => {
  const result = +number.toFixed(decimals);
  return result;
};
