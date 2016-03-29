"use strict";
import objectPath from 'object-path';
import template from 'lodash.template';
import templateSettings from 'lodash.templatesettings';

templateSettings.interpolate = /\{\{(.+?)\}\}/g;


let translations;

const getTemplateString = (key, template, data) => {
    // Pluralisation
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
}

const insertData = (key, templateString, data) => {
    var compiled = template(templateString);
    try {
        return compiled(data);
    } catch (e) {
        return 'Not enough data supplied';
    }
};

const getTemplate = (key) => {
    const template = objectPath.get(translations, key);
    if (template === undefined) {
        return `Missing translation key ${key}`;
    } else {
        return template;
    }
};

export function getI18n(key, data) {
    const template = getTemplate(key);
    const templateString = getTemplateString(key, template, data);
    return insertData(key, templateString, data);
}


export function setLanguage(translationObject) {
    translations = translationObject;
}