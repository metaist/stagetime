import test from 'tape';
import {getShowtimes, parseTime} from '../src/time';

test('time.parseDate', (t) => {
  let a = parseTime(null);
  let b = null;
  t.same(a, b, 'expect null date for falsy');

  a = parseTime(true);
  b = null;
  t.same(a, b, 'expect null date for boolean');


  b = 1534824000000;
  a = parseTime(b);
  t.same(a, b, 'expect date from number');

  const now = new Date();
  a = parseTime(now);
  b = now.getTime();
  t.same(a, b, 'expect time for a given Date');


  a = parseTime('2018-08-21');
  b = new Date(2018, 8 - 1, 21).getTime();
  t.same(a, b, 'expect date from string (local date)');

  a = parseTime('2018-08-21T05:45');
  b = new Date(2018, 8 - 1, 21, 5, 45).getTime();
  t.same(a, b, 'expect date from string (local time)');

  a = parseTime('2018-08-21T05:45:12.345');
  b = new Date(2018, 8 - 1, 21, 5, 45, 12, 345).getTime();
  t.same(a, b, 'expect date from string (local time with ms)');

  a = parseTime('2018-08-21T05:45Z');
  b = Date.UTC(2018, 8 - 1, 21, 5, 45);
  t.same(a, b, 'expect date from string (UTC)');

  t.end();
});

test('time.getShowtimes', (t) => {
  let now = new Date().getTime();
  let times = getShowtimes(new Date(now - 10), new Date(now - 5));
  t.ok(times, 'make sure we get something back');
  t.same(times.is_on, false, 'expect to be off');
  t.same(times.show_in, 0, 'expect no future show time');
  t.same(times.hide_in, 0, 'expect no future hide time');

  now = '2018-05-30';
  let after = '2018-06-01';
  let until = '2018-06-02';
  times = getShowtimes(after, until, now);
  t.same(times.is_on, false, 'expect to be off');
  t.same(times.show_in, 172800000 + 10, 'expect future show time');
  t.same(times.hide_in, 259200000 + 10, 'expect future hide time');

  now = '2018-06-15';
  after = '2018-06-01';
  until = '2018-06-30';
  times = getShowtimes(after, until, now);
  t.same(times.is_on, true, 'expect to be on');
  t.same(times.show_in, 0, 'expect no future show time');
  t.same(times.hide_in, 1296000000 + 10, 'expect future hide time');

  now = '2018-07-01';
  after = '2018-06-01';
  until = '2018-06-30';
  times = getShowtimes(after, until, now);
  t.same(times.is_on, false, 'expect to be off');
  t.same(times.show_in, 0, 'expect no future show time');
  t.same(times.hide_in, 0, 'expect no future hide time');

  t.end();
});
