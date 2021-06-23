"use strict";
exports.__esModule = true;
var _ = require("lodash");
function htmlEntities(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
exports.htmlEntities = htmlEntities;
/** Does ${k} --> v interpolation */
function renderTemplate(template, data) {
    return template.replace(/\$\{([^}]*)\}/g, function (substr, key) {
        return data[key];
    });
}
exports.renderTemplate = renderTemplate;
/** Are all the (k, v) pairs in b also in a? */
function isSupersetOf(a, b) {
    for (var k in b) {
        if (!(k in a))
            return false;
        if (a[k] !== b[k])
            return false;
    }
    return true;
}
exports.isSupersetOf = isSupersetOf;
/** Normalize newlines in values, replacing \r\n and \r with \n */
function normalizeValues(obj) {
    return _.mapValues(obj, function (v) { return v.replace(/\r\n/g, '\n').replace(/\r/g, '\n'); });
}
exports.normalizeValues = normalizeValues;
/**
 * Ensure that rejected promises returned from an express RequestHandler become error responses.
 *
 * This is helpful if you want to use async/await in express get/post handlers:
 *
 *     app.get('/path', wrapPromise(async (request, response) => { ... }))
 */
function wrapPromise(handler) {
    return function (request, response, next) {
        handler(request, response, next)["catch"](function (e) {
            console.error(e);
            next(e);
        });
    };
}
exports.wrapPromise = wrapPromise;
/**
 * Removes leading indents from a template string without removing all leading whitespace.
 * Taken from tslint.
 */
function dedent(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var fullString = strings.reduce(function (accumulator, str, i) { return accumulator + values[i - 1] + str; });
    // match all leading spaces/tabs at the start of each line
    var match = fullString.match(/^[ \t]*(?=\S)/gm);
    if (!match) {
        // e.g. if the string is empty or all whitespace.
        return fullString;
    }
    // find the smallest indent, we don't want to remove all leading whitespace
    var indent = Math.min.apply(Math, match.map(function (el) { return el.length; }));
    var regexp = new RegExp('^[ \\t]{' + indent + '}', 'gm');
    fullString = indent > 0 ? fullString.replace(regexp, '') : fullString;
    return fullString;
}
exports.dedent = dedent;
