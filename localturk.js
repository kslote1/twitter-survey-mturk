#!/usr/bin/env node
"use strict";
/**
 * "Local Turk" server for running Mechanical Turk-like tasks locally.
 *
 * Usage:
 *
 *   localturk [--options] template.html tasks.csv outputs.csv
 */
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
var bodyParser = require("body-parser");
var errorhandler = require("errorhandler");
var express = require("express");
var fs = require("fs-extra");
var path = require("path");
var program = require("commander");
var open = require("open");
var Reservoir = require("reservoir");
var _ = require("lodash");
var csv = require("./csv");
var sample_template_1 = require("./sample-template");
var utils = require("./utils");
program
    .version('2.1.1')
    .usage('[options] template.html tasks.csv outputs.csv')
    .option('-p, --port <n>', 'Run on this port (default 4321)', parseInt)
    .option('-s, --static-dir <dir>', 'Serve static content from this directory. Default is same directory as template file.')
    .option('-r, --random-order', 'Serve images in random order, rather than sequentially. This is useful for ' +
    'generating valid subsamples or for minimizing collisions during group localturking.')
    .option('-w, --write-template', 'Generate a stub template file based on the input CSV.')
    .parse(process.argv);
var args = program.args, randomOrder = program.randomOrder, writeTemplate = program.writeTemplate;
if (!((3 === args.length && !writeTemplate) ||
    (1 === args.length && writeTemplate))) {
    program.help();
}
if (writeTemplate) {
    // tasks.csv is the only input with --write-template.
    args.unshift('');
    args.push('');
}
var templateFile = args[0], tasksFile = args[1], outputsFile = args[2];
var port = program.port || 4321;
// --static-dir is particularly useful for classify-images, where the template file is in a
// temporary directory but the image files could be anywhere.
var staticDir = program['staticDir'] || path.dirname(templateFile);
var flash = ''; // this is used to show warnings in the web UI.
function renderTemplate(_a) {
    var task = _a.task, numCompleted = _a.numCompleted, numTotal = _a.numTotal;
    return __awaiter(this, void 0, void 0, function () {
        var template, fullDict, k, userHtml, thisFlash, sourceInputs;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fs.readFile(templateFile, { encoding: 'utf8' })];
                case 1:
                    template = _b.sent();
                    fullDict = {};
                    for (k in task) {
                        fullDict[k] = utils.htmlEntities(task[k]);
                    }
                    // Note: these two fields are not available in mechanical turk.
                    fullDict['ALL_JSON'] = utils.htmlEntities(JSON.stringify(task, null, 2));
                    fullDict['ALL_JSON_RAW'] = JSON.stringify(task);
                    userHtml = utils.renderTemplate(template, fullDict);
                    thisFlash = flash;
                    flash = '';
                    sourceInputs = _.map(task, function (v, k) {
                        return "<input type=hidden name=\"" + k + "\" value=\"" + utils.htmlEntities(v) + "\">";
                    }).join('\n');
                    return [2 /*return*/, utils.dedent(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    <!doctype html>\n    <html>\n    <title>", " / ", " - localturk</title>\n    <body><form action=/submit method=post>\n    <p>", " / ", " <span style=\"background: yellow\">", "</span></p>\n    ", "\n    ", "\n    <hr/><input type=submit />\n    </form>\n    <script>\n    // Support keyboard shortcuts via, e.g. <.. data-key=\"1\" />\n    window.addEventListener(\"keydown\", function(e) {\n      if (document.activeElement !== document.body) return;\n      var key = e.key;\n      const el = document.querySelector('[data-key=\"' + key + '\"]');\n      if (el) {\n        e.preventDefault();\n        el.click();\n      }\n    });\n    </script>\n    </body>\n    </html>\n  "], ["\n    <!doctype html>\n    <html>\n    <title>", " / ", " - localturk</title>\n    <body><form action=/submit method=post>\n    <p>", " / ", " <span style=\"background: yellow\">", "</span></p>\n    ", "\n    ", "\n    <hr/><input type=submit />\n    </form>\n    <script>\n    // Support keyboard shortcuts via, e.g. <.. data-key=\"1\" />\n    window.addEventListener(\"keydown\", function(e) {\n      if (document.activeElement !== document.body) return;\n      var key = e.key;\n      const el = document.querySelector('[data-key=\"' + key + '\"]');\n      if (el) {\n        e.preventDefault();\n        el.click();\n      }\n    });\n    </script>\n    </body>\n    </html>\n  "])), numCompleted, numTotal, numCompleted, numTotal, thisFlash, sourceInputs, userHtml)];
            }
        });
    });
}
function readCompletedTasks() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!fs.pathExistsSync(outputsFile))
                return [2 /*return*/, []];
            return [2 /*return*/, csv.readAllRowObjects(outputsFile)];
        });
    });
}
function isTaskCompleted(task, completedTasks) {
    var normTask = utils.normalizeValues(task);
    for (var _i = 0, completedTasks_1 = completedTasks; _i < completedTasks_1.length; _i++) {
        var d = completedTasks_1[_i];
        if (utils.isSupersetOf(d, normTask))
            return true;
    }
    return false;
}
function checkTaskOutput(task) {
    return __awaiter(this, void 0, void 0, function () {
        var headers, k;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, csv.readHeaders(tasksFile)];
                case 1:
                    headers = _a.sent();
                    for (k in task) {
                        if (headers.indexOf(k) === -1)
                            return [2 /*return*/]; // there's a new key.
                    }
                    flash = 'No new keys in output. Make sure your &lt;input&gt; elements have "name" attributes';
                    return [2 /*return*/];
            }
        });
    });
}
function getNextTask() {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var completedTasks, sampler, nextTask, numTotal, _b, _c, task, e_1_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, readCompletedTasks()];
                case 1:
                    completedTasks = (_d.sent()).map(utils.normalizeValues);
                    sampler = randomOrder ? Reservoir() : null;
                    numTotal = 0;
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 7, 8, 13]);
                    _b = __asyncValues(csv.readRowObjects(tasksFile));
                    _d.label = 3;
                case 3: return [4 /*yield*/, _b.next()];
                case 4:
                    if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 6];
                    task = _c.value;
                    numTotal++;
                    if (!sampler && nextTask) {
                        return [3 /*break*/, 5]; // we're only counting at this point.
                    }
                    if (isTaskCompleted(utils.normalizeValues(task), completedTasks)) {
                        return [3 /*break*/, 5];
                    }
                    if (sampler) {
                        sampler.pushSome(task);
                    }
                    else {
                        nextTask = task;
                    }
                    _d.label = 5;
                case 5: return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 13];
                case 7:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 13];
                case 8:
                    _d.trys.push([8, , 11, 12]);
                    if (!(_c && !_c.done && (_a = _b["return"]))) return [3 /*break*/, 10];
                    return [4 /*yield*/, _a.call(_b)];
                case 9:
                    _d.sent();
                    _d.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 12: return [7 /*endfinally*/];
                case 13: return [2 /*return*/, {
                        task: sampler ? sampler[0] : nextTask,
                        numCompleted: _.size(completedTasks),
                        numTotal: numTotal
                    }];
            }
        });
    });
}
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(errorhandler());
app.use(express.static(path.resolve(staticDir)));
app.get('/', utils.wrapPromise(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var nextTask, html;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getNextTask()];
            case 1:
                nextTask = _a.sent();
                if (!nextTask.task) return [3 /*break*/, 3];
                console.log(nextTask.task);
                return [4 /*yield*/, renderTemplate(nextTask)];
            case 2:
                html = _a.sent();
                res.send(html);
                return [3 /*break*/, 4];
            case 3:
                res.send('DONE');
                process.exit(0);
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); }));
app.post('/submit', utils.wrapPromise(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var task;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                task = req.body;
                return [4 /*yield*/, csv.appendRow(outputsFile, task)];
            case 1:
                _a.sent();
                checkTaskOutput(task); // sets the "flash" variable with any errors.
                console.log('Saved ' + JSON.stringify(task));
                res.redirect('/');
                return [2 /*return*/];
        }
    });
}); }));
app.post('/delete-last', utils.wrapPromise(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var row;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, csv.deleteLastRow(outputsFile)];
            case 1:
                row = _a.sent();
                console.log('Deleting', row);
                res.redirect('/');
                return [2 /*return*/];
        }
    });
}); }));
if (writeTemplate) {
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        var columns;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, csv.readHeaders(tasksFile)];
                case 1:
                    columns = _a.sent();
                    console.log(sample_template_1.makeTemplate(columns));
                    return [2 /*return*/];
            }
        });
    }); })()["catch"](function (e) {
        console.error(e);
    });
}
else {
    app.listen(port);
    var url = "http://localhost:" + port;
    console.log('Running local turk on', url);
    open(url);
}
var templateObject_1;
