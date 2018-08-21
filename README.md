# stagetime
[Latest Release] - [Documentation] - [Issues]

**stagetime** helps you show or hide DOM elements based on the browser's local time. This allows you to schedule some content to automatically appear or disappear at a certain time.

[![version][badge-version]](https://github.com/metaist/stagetime/blob/master/CHANGELOG.md)
[![license][badge-license]](https://github.com/metaist/stagetime/blob/master/LICENSE.md)
[![build][badge-travis]](https://travis-ci.org/metaist/stagetime)
[![releases][badge-release]][Latest Release]
[![hits][badge-jsdelivr]](https://www.jsdelivr.com/package/npm/stagetime)

[Latest Release]: https://github.com/metaist/stagetime/releases/latest
[Documentation]: https://metaist.github.io/stagetime/
[Issues]: https://github.com/metaist/stagetime/issues

[badge-version]: https://img.shields.io/badge/version-0.1.0-blue.svg
[badge-license]: https://img.shields.io/badge/license-MIT-blue.svg
[badge-travis]: https://travis-ci.org/metaist/stagetime.svg?branch=master
[badge-release]: https://img.shields.io/github/downloads/metaist/stagetime/total.svg
[badge-jsdelivr]: https://data.jsdelivr.com/v1/package/npm/stagetime/badge

## Why?
Sometimes you want to show some information on the client, but it's only relevant for a certain period of time. Outside that window of time (e.g., buying tickets to a concert), that information is not relevant and should be hidden.

Note that `stagetime` doesn't remove any information from the source code; it merely adds classes to control which information is visible in the browser.

## Getting Started
Download the [latest release][Latest Release] or include the following code on your page:
```html
<style>.stagetime-off { display: none; }</style>
<script src="https://cdn.jsdelivr.net/npm/stagetime@0.1.0/dist/stagetime.js"></script>
```

## Examples
```html
<div data-stagetime-after="2018-01-01" data-stagetime-until="2018-12-31">
    This message will appear during the year 2018.
</div>

<div data-stagetime-after="2018-01-01">
    This message will appear after 01 Jan 2018.
</div>

<div data-stagetime-until="2018-12-31">
    This message will appear until 31 Dec 2018.
</div>
```

## Options
`stagetime` will search for elements with the following attributes:
- `data-stagetime-after` - time to start displaying element
- `data-stagetime-until` - time to stop displaying element

Note that you need to specify at least one of these attributes for `stagetime` to work properly.

`stagetime` will add the following classes:
- `stagetime-on` - the item is supposed to be displayed
- `stagetime-off` - the item is supposed to be hidden

You may style these however you wish. A recommended style is:
```html
<style>.stagetime-off { display: none; }</style>
```

## Goals & Non-Goals
1. The goal of stagetime is to make it easy to show or hide DOM elements for a certain time window.
2. It is a non-goal to allow multiple time windows.

## License
Licensed under the [MIT License].

[MIT License]: http://opensource.org/licenses/MIT
