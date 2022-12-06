/**
 * Create the sendInfo subscriber
 *
 * @returns {Function} Subscriber
 */
export default function sendInfo() {
  return ({ time, contractJSON }) => {
    console.log(`${time}\t${contractJSON}`);
  };
}
