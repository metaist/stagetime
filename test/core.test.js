import 'jsdom-global/register'
import $ from 'jquery';
import {init} from '../src/core';
import test from 'tape';

test('core.init', (t) => {
  const now = new Date().getTime();
  const tplus = delta => new Date(now + delta).toISOString();
  const html = `
<div>
  <span
    data-stagetime-after="${tplus(-1 * 1000)}"
    data-stagetime-until="${tplus(+1 * 1000)}">1</span>
  <span data-stagetime-after="${tplus(+1 * 1000)}">1</span>
  <span data-stagetime-after="${tplus(-1 * 1000)}">2</span>
  <span data-stagetime-until="${tplus(+1 * 1000)}">2</span>
  <span data-stagetime-until="${tplus(-1 * 1000)}">2</span>
</div>
`;
  const $dom = $(html);

  let expect = $dom.find('span').get();
  let result = init(null, {context: $dom[0]});
  t.is(result.length, expect.length, 'expect same number of items');
  t.same(result, expect, 'expect all the same elements');

  expect = $dom.find('span')[0];
  result = init(expect);
  t.same(result, expect, 'expect single DOM node');

  t.end();
});
