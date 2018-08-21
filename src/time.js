/**
  Maximum number of milliseconds allowed for `setTimeout`.
  @private
*/
const MAX_TIMEOUT = Math.pow(2, 31) - 1;

/**
  Convert a date string into the number of milliseconds from the epoch.

  @private
  @param {string|number|Date} [input] The string to parse.
  @returns {number} The number of milliseconds from midnight on Jan 1, 1970.
*/
const parseTime = (input) => {
  let result = null;
  if (!input) { return result; }

  let constructor = null;
  let parts = [];

  const tag = Object.prototype.toString.call(input);
  switch (tag) {
    case '[object Number]':
      result = input;
      break;
    case '[object Date]':
      result = input.getTime();
      break;
    case '[object String]':
      constructor = input.endsWith('Z') ?
        (...args) => Date.UTC(...args) :
        (...args) => new Date(...args).getTime();

      parts = input.split(/[-.:\sTZ+]/);
      result = constructor(
        parts[0], parts[1] - 1, parts[2], // date
        parts[3] || 0, parts[4] || 0, parts[5] || 0, parts[6] || 0 // time
      );
      break;
    default:
      result = null;
  } // end switch: handle dates and numbers

  return result;
};

/**
  @private
  @typedef {Object} Showtime
  @property {boolean} is_on Indicates whether the time is within the window.
  @property {number} show_in Number of milliseconds after which window opens.
  @property {number} hide_in Number of milliseconds after which window closes.
*/

/**
  Return details about whether a time is within a time window.

  @private
  @param {string} after Start of the time window.
  @param {string} until End of the time window.
  @param {string} [now] The current time.
  @returns {Showtime} Returns details of the time window.
*/
const getShowtimes = (after, until, now = null) => {
  const t_now = parseTime(now) || new Date().getTime();
  const t_after = parseTime(after);
  const t_until = parseTime(until);
  return {
    is_on: !(t_after && t_now < t_after) && !(t_until && t_now > t_until),
    show_in: t_now < t_after ? Math.min(t_after - t_now + 10, MAX_TIMEOUT) : 0,
    hide_in: t_now < t_until ? Math.min(t_until - t_now + 10, MAX_TIMEOUT) : 0
  }
}

export {parseTime, getShowtimes}
export default {
  parseTime: parseTime,
  getShowtimes: getShowtimes
}
