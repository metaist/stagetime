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

export {getElements}
export default {
  getElements: getElements
}
