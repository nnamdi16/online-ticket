const clientFee = (amount: number) => {
  return amount - amount * 0.15;
};

const companyFee = (amount: number) => {
  return amount * 0.15;
};
export { clientFee, companyFee };
