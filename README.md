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
 * @param {object} i18nSource - An object with languages strings.
 */
setI18n(i18nSource);

/**
 * @param {string} keyPath - A keyPath (e.g. 'categories.heading' or 'hello').
 * @param {object} data -  Optional
 * @returns {string}
 */
getI18n(keyPath, data)
```

## Usage

##### Setup
```js
import {setI18n} from 'get-i18n';

setI18n({
    categories: {
        heading: 'Categories'
    },
    products: {
        heading: 'Other products from {{name}}.'
    },
    messages: {
        heading: {
            0: 'You have no new message.',
            1: 'You have one new message.',
            other: 'You have {{count}} new messages.'
        }
    }
});
```

##### Hello World
```js
import {getI18n} from 'get-i18n';
getI18n('categories.heading') // Categories
```

##### Interpolation
```js
import {getI18n} from 'get-i18n';
getI18n('products.heading', {name: 'Jan'}); // Other products from Jan
```

##### Pluralization 
```js
import {getI18n} from 'get-i18n';

getI18n('messages.heading', {count: 0}); // You have no new message.
getI18n('messages.heading', {count: 1}); // You have one new message.
getI18n('messages.heading', {count: 7}); // You have 7 new messages.
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