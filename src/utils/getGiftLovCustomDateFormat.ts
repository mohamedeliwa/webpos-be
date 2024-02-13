/**
 * converts the current date/time to X-GIFTLOV-DATE
 * @returns X-GIFTLOV-DATE custom date/time format is `ddMMyyyyHHmmss`
 */
const getGiftLovCustomDateFormat = (): string => {
  const today = new Date();

  const day = today.getUTCDate().toString().padStart(2, '0');
  const month = (today.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = today.getUTCFullYear().toString().padStart(4, '0');
  const hour = today.getUTCHours().toString().padStart(2, '0');
  const minutes = today.getUTCMinutes().toString().padStart(2, '0');
  const seconds = today.getUTCSeconds().toString().padStart(2, '0');

  const gitLovDateFormat = `${day}${month}${year}${hour}${minutes}${seconds}`;
  return gitLovDateFormat;
};
export default getGiftLovCustomDateFormat;
