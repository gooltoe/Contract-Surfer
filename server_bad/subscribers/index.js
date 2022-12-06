import logMessage from "./log_message";
import sendInfo from "./send_info";

/**
 * Load listeners on an emitter
 *
 * @param {EventEmitter} emitter Emitter that will receive the listeners
 * @returns {EventEmitter} Emitter with the listeners attacched
 */
export default function loadListeners(emitter) {
  emitter.on("log_message", logMessage());
  emitter.on("send_info", sendInfo());

  return emitter;
}
