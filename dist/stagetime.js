/** stagetime v0.1.0 | @copyright 2018 Metaist LLC <metaist.com> | @license MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.stagetime = {})));
}(this, (function (exports) { 'use strict';

  var version = "0.1.0";

  /**
    Return the elements from a string or selection.

    @private
    @param {Elements[]|Element|string} elements Either one or more Element
      objects, or a selector string.
    @param {Document} context The context of the search.
    @returns {Elements[]} The selected elements.
  */
  const getElements = (elements, context = document) => {
    var els = [];
    if (elements.tagName) {
      els = [elements];
    } else if ('[object String]' === Object.prototype.toString.call(elements)) {
      els = Array.from(context.querySelectorAll(elements));
    } else if (elements.length && elements.length > -1) {
      els = Array.from(elements);
    } // end if: have an array
    return els;
  };

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
  };

  const DEFAULTS = {
    context: document,
    attr_after: 'data-stagetime-after',
    attr_until: 'data-stagetime-until',
    class_on: 'stagetime-on',
    class_off: 'stagetime-off',
  };

  /**
    Show or hide elements based on data attributes.

    @memberof stagetime
    @param {Element} [el] Element to initialize. If missing, all elements with
      either a `data-stagetime-after` or `data-stagetime-until` attributes will be
      initialized.
    @param {Object} [settings] Override default settings.
    @param {Object} [settings.context=document] The context to search for nodes.
    @param {string} [settings.attr_after] The attribute for time start.
    @param {string} [settings.attr_until] The attribute for time end.
    @param {string} [settings.class_on] The class when object should be shown.
    @param {string} [settings.class_off] The class when object should be hidden.
    @returns {Element|Element[]} Returns the elements that were initialized.
    @description
    * This function inspects the `data-stagetime-after` and `data-stagetime-until`
    * attributes of the given element and then adds or removes the `stagetime-on`
    * or `stagetime-off` classes appropriately.
    *
    * This function will also schedule future checks in case the `after` or
    * `until` times are in the future.
    */
  const init = (el, settings = {}) => {
    const opts = Object.assign({}, DEFAULTS, settings);

    if (!el) {
      const sel = `[${opts.attr_after}],[${opts.attr_until}]`;
      return getElements(sel, opts.context).map(item => init(item, opts));
    } // end if: all elements initialized

    const times = getShowtimes(
      el.getAttribute(opts.attr_after),
      el.getAttribute(opts.attr_until)
    );

    el.classList.add(times.is_on ? opts.class_on : opts.class_off);
    el.classList.remove(times.is_on ? opts.class_off : opts.class_on);

    if (times.show_in) { setTimeout(() => init(el), times.show_in); }
    if (times.hide_in) { setTimeout(() => init(el), times.hide_in); }

    return el;
  };

  init(); // run automatically

  /**
    stagetime - Show or hide DOM elements based on the local time.
    @namespace stagetime
  */

  exports.version = version;
  exports.init = init;
  exports.DEFAULTS = DEFAULTS;

  Object.defineProperty(exports, '__esModule', { value: true });

  exports._build = "2018-08-21T23:36:24.627Z";

})));
