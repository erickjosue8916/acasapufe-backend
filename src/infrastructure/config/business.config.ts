export const business = () => ({
  servicePrice: parseInt(process.env.BUSINESS_SERVICE_PRICE),
  servicePriceUnit: parseInt(process.env.BUSINESS_SERVICE_PRICE_UNIT),
});
