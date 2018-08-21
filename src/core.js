import {getElements} from './dom';
import {getShowtimes} from './time';


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

export {init, DEFAULTS}
export default {
  init: init,
  DEFAULTS: DEFAULTS
}
