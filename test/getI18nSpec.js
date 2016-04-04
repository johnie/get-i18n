import assert from 'assert';
import {setI18n, getI18n} from '../src/getI18n.js';


setI18n({
    categories: {
        header: 'Categories',
        subheading: {
            0: 'There are no items in the {{category}} secion.',
            1: 'There are one item in the {{category}} section.',
            other: 'There are {{count}} items in the {{category}} section.'
        }
    },
    products: {
        header: 'Other products from {{name}}.'
    },
    messages: {
        header: {
            0: 'You have no new message.',
            1: 'You have one new message.',
            other: 'You have {{count}} new messages.'
        },
        history: {
            heading: 'Messages between {{user1}} and {{user2}}.'
        }
    },
    notifications: '{{count}}',
    calendar: {
        heading: 'Calendar',
        description: 'Lorem ipsum...'
    }
});


describe('Get translation string...', function () {
    it(`for just a key`, function () {
        const translation = getI18n('categories.header');
        assert.equal(translation, 'Categories');
    });

    it(`with pluralisation support and zero items`, function () {
        const translation = getI18n('messages.header', {count: 0});
        assert.equal(translation, 'You have no new message.');
    });

    it(`with pluralisation support and 1 item`, function () {
        const translation = getI18n('messages.header', {count: 1});
        assert.equal(translation, 'You have one new message.');
    });

    it(`with pluralisation support and more items than specified`, function () {
        const translation = getI18n('messages.header', {count: 10});
        assert.equal(translation, 'You have 10 new messages.');
    });

    it(`with pluralisation support and undefined amount of items`, function () {
        const translation = getI18n('messages.header', {count: undefined});
        assert.equal(translation, 'You have no new message.');
    });

    it(`get translation with data`, function () {
        const translation = getI18n('products.header', {name: 'Jan'});
        assert.equal(translation, 'Other products from Jan.');
    });

    it(`get translation with data and pluralisation`, function () {
        const translation = getI18n('categories.subheading', {
            category: 'Cars',
            count: 10
        });
        assert.equal(translation, 'There are 10 items in the Cars section.')
    });

    it(`get translation with count without pluralisation`, function () {
        const translation = getI18n('notifications', {count: 7});
        assert.equal(translation, '7')
    });
});

describe('Get namespace with...', function () {
    it(`just a keys`, function () {
        const translations = getI18n('calendar');
        assert.equal(Object.keys(translations).length, 2);
    });
    it(`data`, function () {
        const translations = getI18n('products', {header: {name: 'Jan'}});
        assert.equal(translations.header, 'Other products from Jan.');
    });
    it(`no enough data`, function () {
        const translations = getI18n('products');
        assert.equal(typeof translations, 'object');
    });

    it(`no enough data and pluralization`, function () {
        const translations = getI18n('categories');
        assert.equal(translations.subheading, 'Not enough data supplied');
    });
});


describe('Get erroneous string when...', function () {
    it(`using unknown key`, function () {
        const translation = getI18n('no.key.here');
        assert.equal(translation, 'Missing translation key no.key.here');
    });

    it(`not supplying data`, function () {
        const translation = getI18n('products.header');
        assert.equal(translation, 'Not enough data supplied');
    });

    it(`not supplying enough data`, function () {
        const translation = getI18n('messages.history.heading', {user1: 'Jan'});
        assert.equal(translation, 'Not enough data supplied');
    });
});
