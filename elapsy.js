const chalk = require('chalk');

let instance = null;
function pad(num, size) {
  let s = num.toString();
  while (s.length < size) {
    s = `0${s}`;
  }
  return s;
}

/**
 * Singleton class that calculates the elapsed time from the first time a new object wa created until the call
 * of one of the possible functions
 * @class ElapsedTime
 * @module ElapsedTime
 */
class Elapsy {
  /**
   * Create the singleton instance and set the current time
   * @constructor
   * @return {Object} The singleton instance
   */
  constructor() {
    if (!instance) {
      instance = this;
    }
    this.startTime = new Date();

    return instance;
  }

  /**
   * Get the current elapsed time in miliseconds
   * @method elapsedTime
   * @return {Number} The elapsed time in miliseconds
   */
  time() {
    const now = new Date().getTime();
    return now - this.startTime.getTime();
  }

  /**
   * Get a formated (hh:mm:ss.ms) string of the current elapsed time.
   * If the elapsed time is more than a day, the number of days is show in the start
   * of the string
   * @method formatedElapsedTime
   * @return {String} The formated elapsed time in miliseconds
   * @example 00:13:08.324
   *          03:00:59.999
   *          1 day, 12:43:17.385
   *          428 days, 04:58:23.032
   */
  formated(showMs) {
    const elapsedTime = this.time();
    const date = new Date(elapsedTime);

    const d = (date.getUTCDate()-1);
    const plural = d === 1 ? '' : 's';
    const day = d === 0 ? '' : `${d} day${plural}, `;

    const hour = pad(date.getUTCHours().toString(), 2);
    const min = pad(date.getUTCMinutes().toString(), 2);
    const sec = pad(date.getUTCSeconds().toString(), 2);
    if (showMs) {
      const ms =  pad(date.getUTCMilliseconds().toString(), 3);
      return `${day}${hour}:${min}:${sec}.${ms}`;
    }
    return `${day}${hour}:${min}:${sec}`;
  }

  /**
   * Insert the formated (hh:mm:ss.ms) string of the current elapsed time in the
   * right end of the terminal
   * @method logElapsedTime
   * @param {string} [color = 'blue'] The 'chalk' color to be displayed
   * @example
   * [WORKING] 5 links crawled                                   [00:00:03.071]
   */
  log(color = 'blue', showMs) {
    const width = process.stdout.columns - 2;
    const elapsed = this.formated(showMs);
    const position = width - elapsed.length;
    process.stdout.cursorTo(position);
    process.stdout.write(chalk[color](`[${elapsed}]`));
  }

}

module.exports = Elapsy;
