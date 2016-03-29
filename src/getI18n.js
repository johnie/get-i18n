"use strict";
import objectPath from 'object-path';
import template from 'lodash.template';
import map from 'object.map';
import templateSettings from 'lodash.templatesettings';

// Set lodash template settings to mustache syntax
templateSettings.interpolate = /\{\{(.+?)\}\}/g;

// This variable will stored compiled templates
let i18n = null;

const getTemplateString = (key, template, data) => {
    if (typeof template === 'object') {
        if (data.count !== undefined) {
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
    const template = objectPath.get(translations, key);
    if (template === undefined) {
        return `Missing translation key ${key}`;
    } else {
        return template;
    }
};


export function getI18n(key, data) {
    const template = getTemplate(i18n, key);
    const templateString = getTemplateString(key, template, data);
    return insertData(key, templateString, data);
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
