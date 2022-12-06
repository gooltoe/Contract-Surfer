/**
 * Create the sendInfo subscriber
 *
 * @returns {Function} Subscriber
 */
export default function sendInfo() {
  return ({ socket, contractJSON }) => {
    // return contractJSON;
    socket.emit("send_to_client", contractJSON);
  };
}
