/**
 * Create the sendInfo subscriber
 *
 * @returns {Function} Subscriber
 */
export default function sendInfo() {
  return ({ contractJSON }) => {
    // trigger a socket.io event to send to client
    console.log(contractJSON);
  };
}
