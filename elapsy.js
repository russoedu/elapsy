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

    console.log(this);
    return instance;
  }

  /**
   * Get the current elapsed time in miliseconds
   * @method elapsedTime
   * @return {Number} The elapsed time in miliseconds
   */
  time(now = new Date().getTime()) {
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
  formated() {
    const elapsedTime = this.time();
    let response = '';
    if (elapsedTime < 1000) {
      response = `00:00:00.${pad(elapsedTime, 3)}`;
    } else if (elapsedTime >= 1000 && elapsedTime < 60 * 1000) {
      const sec = pad(parseInt((elapsedTime / 1000).toString(), 10), 2);
      const ms = pad(elapsedTime % 1000, 3);
      response = `00:00:${sec}.${ms}`;
    } else if (elapsedTime >= 60 * 100 && elapsedTime < 60 * 60 * 100) {
      const min = pad(parseInt((elapsedTime / 60 / 1000).toString(), 10), 2);
      const sec = pad(parseInt((elapsedTime / 1000).toString(), 10), 2);
      const ms = pad(elapsedTime % 1000, 3);
      response = `00:${min}:${sec}.${ms}`;
    } else if (elapsedTime >= 60 * 60 * 100 && elapsedTime < 24 * 60 * 60 * 100) {
      const hour = pad(parseInt((elapsedTime / 60 / 60 / 1000).toString(), 10), 2);
      const min = pad(parseInt((elapsedTime / 60 / 1000).toString(), 10), 2);
      const sec = pad(parseInt((elapsedTime / 1000).toString(), 10), 2);
      const ms = pad(elapsedTime % 1000, 3);
      response = `${hour}:${min}:${sec}.${ms}`;
    } else {
      const day = parseInt((elapsedTime / 24 / 60 / 60 / 1000).toString(), 10);
      const plural = day === 1 ? '' : 's';
      const hour = pad(parseInt((elapsedTime / 60 / 60 / 1000).toString(), 10), 2);
      const min = pad(parseInt((elapsedTime / 60 / 1000).toString(), 10), 2);
      const sec = pad(parseInt((elapsedTime / 1000).toString(), 10), 2);
      const ms = pad(elapsedTime % 1000, 3);
      response = `${day} day${plural}, ${hour}:${min}:${sec}.${ms}`;
    }
    return response;
  }

  /**
   * Insert the formated (hh:mm:ss.ms) string of the current elapsed time in the
   * right end of the terminal
   * @method logElapsedTime
   * @param {string} [color = 'blue'] The 'chalk' color to be displayed
   * @example
   * [WORKING] 5 links crawled                                   [00:00:03.071]
   */
  log(color = 'blue') {
    const width = process.stdout.columns - 2;
    const elapsed = this.formated();
    const position = width - elapsed.length;
    process.stdout.cursorTo(position);
    process.stdout.write(chalk[color](`[${elapsed}]`));
  }

}

module.exports = Elapsy;
