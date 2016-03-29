"use strict";
Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.getI18n = getI18n;
exports.setLanguage = setLanguage;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _objectPath = require('object-path');

var _objectPath2 = _interopRequireDefault(_objectPath);

var _lodashTemplate = require('lodash.template');

var _lodashTemplate2 = _interopRequireDefault(_lodashTemplate);

var _lodashTemplatesettings = require('lodash.templatesettings');

var _lodashTemplatesettings2 = _interopRequireDefault(_lodashTemplatesettings);

_lodashTemplatesettings2['default'].interpolate = /\{\{(.+?)\}\}/g;

var translations = undefined;

var getTemplateString = function getTemplateString(key, template, data) {
    // Pluralisation
    if (typeof template === 'object') {
        if (data.count !== undefined) {
            if (template[data.count]) {
                return template[data.count];
            } else if (template.other) {
                return template.other;
            } else {
                return 'Missing \'other\' property on ' + key;
            }
        } else {
            if (template[0]) {
                return template[0];
            } else {
                return 'Missing \'0\' property on ' + key;
            }
        }
    } else {
        return template;
    }
};

var insertData = function insertData(key, templateString, data) {
    var compiled = (0, _lodashTemplate2['default'])(templateString);
    try {
        return compiled(data);
    } catch (e) {
        return 'Not enough data supplied';
    }
};

var getTemplate = function getTemplate(key) {
    var template = _objectPath2['default'].get(translations, key);
    if (template === undefined) {
        return 'Missing translation key ' + key;
    } else {
        return template;
    }
};

function getI18n(key, data) {
    var template = getTemplate(key);
    var templateString = getTemplateString(key, template, data);
    return insertData(key, templateString, data);
}

function setLanguage(translationObject) {
    translations = translationObject;
}
