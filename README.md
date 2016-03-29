get-i18n
=================
[![Build Status](https://travis-ci.org/janjarfalk/get-i18n.svg?branch=master)](https://travis-ci.org/janjarfalk/get-i18n)

## Installation
```bash
npm install get-i18n --save
```

## Syntax
```js
/**
 * @param {string} keyPath - A keyPath (e.g. 'categories.heading' or 'hello').
 * @param {object} data -  Optional
 * @returns {string}
 */
getI18n(keyPath, data)
```

## Usage
```js
import getI18n from 'get-i18n';
```

## Tests
```bash
npm test
```
## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 1.0.0 Initial release