import 'jsdom-global/register'
import * as DOM from '../src/dom';
import $ from 'jquery';
import test from 'tape';

test('dom.getElements', (t) => {
  const html = '<div><span>1</span><span>2</span><span>3</span></div>';
  const $dom = $(html);

  let expect = [$dom.find('span')[0]];
  let result = DOM.getElements(expect[0]);
  t.is(result.length, 1, 'expect 1 item');
  t.same(result, expect, 'expect element to come back as array');

  expect = $dom.find('span').get();
  result = DOM.getElements('span', $dom[0]);
  t.is(result.length, 3, 'expect 3 items');
  t.same(result, expect, 'expect elements selected by query');

  expect = $dom.find('span').get().slice(1);
  result = DOM.getElements(expect);
  t.is(result.length, expect.length, 'expect same number of items');
  t.same(result, expect, 'expect elements selected by array of elements');

  expect = [];
  result = DOM.getElements(123);
  t.is(result.length, expect.length, 'expect same number of items');
  t.same(result, expect, 'expect no resulting elements');


  t.end();
});
