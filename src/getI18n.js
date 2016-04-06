"use strict";
import template from 'lodash.template';
import templateSettings from 'lodash.templatesettings';

var objectPath = function(obj, path){
    for (var i=0, path=path.split('.'), len=path.length; i<len; i++){
        if(obj[path[i]]){
        obj = obj[path[i]];
        } else {
            return undefined;
        }
    };
    return obj;
};

function map(obj, mapFunc) {
    return Object.keys(obj).reduce(function (newObj, value) {
        newObj[value] = mapFunc(obj[value], value);
        return newObj;
    }, {});
}

// Set lodash template settings to mustache syntax
templateSettings.interpolate = /\{\{(.+?)\}\}/g;

// This variable will stored compiled templates
let i18n = null;

const isPluralizationKey = (obj) => {
    if (obj.other) {
        return true;
    } else {
        return false;
    }
}

const isNamespace = (obj) => {
    if (typeof obj === 'function' || typeof obj === 'string') {
        return false;
    } else if (isPluralizationKey(obj)) {
        return false
    } else {
        return true;
    }
};

const getTemplateString = (key, template, data) => {
    if (typeof template === 'object') {
        if (data && data.count !== undefined) {
            if (template[data.count]) {
                return template[data.count]
            } else if (template.other) {
                return template.other;
            } else {
                return `Missing 'other' property on ${key}`;
            }
        } else {
            if (template[0]) {
                return template[0]
            } else {
                return `Missing '0' property on ${key}`;
            }
        }
    } else {
        return template;
    }
};

const insertData = (key, compiled, data) => {
    if (typeof compiled === 'string') {
        return compiled;
    }
    try {
        return compiled(data);
    } catch (e) {
        return 'Not enough data supplied';
    }
};

const getTemplate = (translations, key) => {
    const template = objectPath(translations, key);
    if (template === undefined) {
        return `Missing translation key ${key}`;
    } else {
        return template;
    }
};


export function getI18n(key, data) {
    const template = getTemplate(i18n, key);
    if (isNamespace(template)) {
        const ret = map(template, (t, k) => {
            const d = data && data[k];
            const string = getTemplateString(key, t, d);
            return insertData(key, string, d);
        });
        return ret;
    } else {
        const templateString = getTemplateString(key, template, data);
        return insertData(key, templateString, data);
    }
}

export function setI18n(i18nSource) {
    const compileTemplateTree = (tree) => {
        if (typeof tree === 'string') {
            return template(tree);
        } else {
            return map(tree, compileTemplateTree);
        }
    };
    i18n = compileTemplateTree(i18nSource);
}
