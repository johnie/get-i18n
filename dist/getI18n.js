"use strict";
Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.getI18n = getI18n;
exports.setI18n = setI18n;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _objectPath = require('object-path');

var _objectPath2 = _interopRequireDefault(_objectPath);

var _lodashTemplate = require('lodash.template');

var _lodashTemplate2 = _interopRequireDefault(_lodashTemplate);

var _objectMap = require('object.map');

var _objectMap2 = _interopRequireDefault(_objectMap);

var _lodashTemplatesettings = require('lodash.templatesettings');

var _lodashTemplatesettings2 = _interopRequireDefault(_lodashTemplatesettings);

// Set lodash template settings to mustache syntax
_lodashTemplatesettings2['default'].interpolate = /\{\{(.+?)\}\}/g;

// This variable will stored compiled templates
var i18n = null;

var isPluralizationKey = function isPluralizationKey(obj) {
    if (obj.other) {
        return true;
    } else {
        return false;
    }
};

var isNamespace = function isNamespace(obj) {
    if (typeof obj === 'function' || typeof obj === 'string') {
        return false;
    } else if (isPluralizationKey(obj)) {
        return false;
    } else {
        return true;
    }
};

var getTemplateString = function getTemplateString(key, template, data) {
    if (typeof template === 'object') {
        if (data && data.count !== undefined) {
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

var insertData = function insertData(key, compiled, data) {
    if (typeof compiled === 'string') {
        return compiled;
    }
    try {
        return compiled(data);
    } catch (e) {
        return 'Not enough data supplied';
    }
};

var getTemplate = function getTemplate(translations, key) {
    var template = _objectPath2['default'].get(translations, key);
    if (template === undefined) {
        return 'Missing translation key ' + key;
    } else {
        return template;
    }
};

function getI18n(key, data) {
    var template = getTemplate(i18n, key);
    if (isNamespace(template)) {
        console.log('yes', key);
        var ret = (0, _objectMap2['default'])(template, function (t, k) {
            var d = data && data[k];
            var string = getTemplateString(key, t, d);
            return insertData(key, string, d);
        });
        console.log(ret);
        return ret;
    } else {
        var templateString = getTemplateString(key, template, data);
        return insertData(key, templateString, data);
    }
}

function setI18n(i18nSource) {
    var compileTemplateTree = function compileTemplateTree(tree) {
        if (typeof tree === 'string') {
            return (0, _lodashTemplate2['default'])(tree);
        } else {
            return (0, _objectMap2['default'])(tree, compileTemplateTree);
        }
    };
    i18n = compileTemplateTree(i18nSource);
}
