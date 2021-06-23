"use strict";
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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
var csvParse = require("csv-parse");
var csvStringify = require("csv-stringify");
var fs = require("fs-extra");
if (!Symbol['asyncIterator']) {
    Symbol['asyncIterator'] = Symbol();
}
var csvOptions = {
    skip_empty_lines: true
};
function isPromise(x) {
    return ('then' in x);
}
/** Read a CSV file line-by-line. */
function readRows(file) {
    return __asyncGenerator(this, arguments, function readRows_1() {
        var parser, stream, isDone, dataCallback, mkBarrier, rows, row;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parser = csvParse(csvOptions);
                    stream = fs.createReadStream(file, 'utf8');
                    isDone = false;
                    mkBarrier = function () { return new Promise(function (resolve, reject) {
                        dataCallback = resolve;
                    }); };
                    rows = [mkBarrier()];
                    parser.on('readable', function () {
                        var row;
                        while (row = parser.read()) {
                            rows.push({ type: 'row', value: row });
                        }
                        var oldCb = dataCallback;
                        rows.push(mkBarrier());
                        oldCb();
                    });
                    parser.on('error', function (error) {
                        rows.push({ type: 'error', error: error });
                        parser.pause();
                        dataCallback();
                    });
                    parser.on('finish', function () {
                        rows.push({ type: 'done' });
                        dataCallback();
                    });
                    stream.pipe(parser);
                    _a.label = 1;
                case 1:
                    if (!rows.length) return [3 /*break*/, 8];
                    row = rows.shift();
                    if (!isPromise(row)) return [3 /*break*/, 3];
                    return [4 /*yield*/, __await(row)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 3:
                    if (!(row.type === 'row')) return [3 /*break*/, 6];
                    return [4 /*yield*/, __await(row.value)];
                case 4: return [4 /*yield*/, _a.sent()];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    if (row.type === 'error') {
                        throw new Error(row.error);
                    }
                    else if (row.type === 'done') {
                        return [3 /*break*/, 8];
                    }
                    _a.label = 7;
                case 7: return [3 /*break*/, 1];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.readRows = readRows;
/** Read just the headers from a CSV file. */
function readHeaders(file) {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var _b, _c, row, e_1_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 5, 6, 11]);
                    _b = __asyncValues(readRows(file));
                    _d.label = 1;
                case 1: return [4 /*yield*/, _b.next()];
                case 2:
                    if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 4];
                    row = _c.value;
                    return [2 /*return*/, row];
                case 3: return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 11];
                case 5:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 11];
                case 6:
                    _d.trys.push([6, , 9, 10]);
                    if (!(_c && !_c.done && (_a = _b["return"]))) return [3 /*break*/, 8];
                    return [4 /*yield*/, _a.call(_b)];
                case 7:
                    _d.sent();
                    _d.label = 8;
                case 8: return [3 /*break*/, 10];
                case 9:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 10: return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.readHeaders = readHeaders;
/** Write a CSV file */
function writeCsv(file, rows) {
    return __awaiter(this, void 0, void 0, function () {
        var output;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, stringify(rows)];
                case 1:
                    output = _a.sent();
                    return [4 /*yield*/, fs.writeFile(file, output, { encoding: 'utf8' })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.writeCsv = writeCsv;
function stringify(rows) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    csvStringify(rows, function (error, output) {
                        if (error) {
                            reject(error);
                        }
                        else {
                            resolve(output);
                        }
                    });
                })];
        });
    });
}
/**
 * Append one row to a CSV file.
 *
 * If the row contains a new header, the entire file will be rewritten.
 */
function appendRow(file, row) {
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function () {
        var exists, header, rows, lines, headerRow, headers, headerToIndex, newHeaders, k, fullHeaders, rows, emptyCols, lines_1, lines_1_1, row_1, e_2_1, newRow, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, fs.pathExists(file)];
                case 1:
                    exists = _e.sent();
                    if (!exists) {
                        header = Object.keys(row);
                        rows = [header, header.map(function (k) { return row[k]; })];
                        return [2 /*return*/, writeCsv(file, rows)];
                    }
                    lines = readRows(file);
                    return [4 /*yield*/, lines.next()];
                case 2:
                    headerRow = _e.sent();
                    if (headerRow.done) {
                        throw new Error("CSV file " + file + " was empty");
                    }
                    headers = headerRow.value;
                    headerToIndex = {};
                    headers.forEach(function (header, i) {
                        headerToIndex[header] = i;
                    });
                    newHeaders = [];
                    for (k in row) {
                        if (!(k in headerToIndex)) {
                            newHeaders.push(k);
                        }
                    }
                    if (!newHeaders.length) return [3 /*break*/, 16];
                    fullHeaders = headers.concat(newHeaders);
                    rows = [fullHeaders];
                    emptyCols = newHeaders.map(function () { return ''; });
                    _e.label = 3;
                case 3:
                    _e.trys.push([3, 8, 9, 14]);
                    lines_1 = __asyncValues(lines);
                    _e.label = 4;
                case 4: return [4 /*yield*/, lines_1.next()];
                case 5:
                    if (!(lines_1_1 = _e.sent(), !lines_1_1.done)) return [3 /*break*/, 7];
                    row_1 = lines_1_1.value;
                    rows.push(row_1.concat(emptyCols));
                    _e.label = 6;
                case 6: return [3 /*break*/, 4];
                case 7: return [3 /*break*/, 14];
                case 8:
                    e_2_1 = _e.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 14];
                case 9:
                    _e.trys.push([9, , 12, 13]);
                    if (!(lines_1_1 && !lines_1_1.done && (_a = lines_1["return"]))) return [3 /*break*/, 11];
                    return [4 /*yield*/, _a.call(lines_1)];
                case 10:
                    _e.sent();
                    _e.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 13: return [7 /*endfinally*/];
                case 14:
                    rows.push(fullHeaders.map(function (k) { return row[k] || ''; }));
                    return [4 /*yield*/, writeCsv(file, rows)];
                case 15:
                    _e.sent();
                    return [3 /*break*/, 20];
                case 16:
                    newRow = headers.map(function (k) { return row[k] || ''; });
                    return [4 /*yield*/, lines["return"]()];
                case 17:
                    _e.sent(); // close the file for reading.
                    _c = (_b = fs).appendFile;
                    _d = [file];
                    return [4 /*yield*/, stringify([newRow])];
                case 18: // close the file for reading.
                return [4 /*yield*/, _c.apply(_b, _d.concat([_e.sent()]))];
                case 19:
                    _e.sent();
                    _e.label = 20;
                case 20: return [2 /*return*/];
            }
        });
    });
}
exports.appendRow = appendRow;
function deleteLastRow(file) {
    var e_3, _a;
    return __awaiter(this, void 0, void 0, function () {
        var rows, _b, _c, row, e_3_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    rows = [];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 6, 7, 12]);
                    _b = __asyncValues(readRows(file));
                    _d.label = 2;
                case 2: return [4 /*yield*/, _b.next()];
                case 3:
                    if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                    row = _c.value;
                    rows.push(row);
                    _d.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_3_1 = _d.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _d.trys.push([7, , 10, 11]);
                    if (!(_c && !_c.done && (_a = _b["return"]))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(_b)];
                case 8:
                    _d.sent();
                    _d.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_3) throw e_3.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [4 /*yield*/, writeCsv(file, rows.slice(0, -1))];
                case 13:
                    _d.sent();
                    return [2 /*return*/, rows[rows.length - 1]];
            }
        });
    });
}
exports.deleteLastRow = deleteLastRow;
function readRowObjects(file) {
    return __asyncGenerator(this, arguments, function readRowObjects_1() {
        var header, _a, _b, row, rowObj_1, e_4_1;
        var e_4, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 8, 9, 14]);
                    _a = __asyncValues(readRows(file));
                    _d.label = 1;
                case 1: return [4 /*yield*/, __await(_a.next())];
                case 2:
                    if (!(_b = _d.sent(), !_b.done)) return [3 /*break*/, 7];
                    row = _b.value;
                    if (!!header) return [3 /*break*/, 3];
                    header = row;
                    return [3 /*break*/, 6];
                case 3:
                    rowObj_1 = {};
                    row.forEach(function (col, i) {
                        rowObj_1[header[i]] = col;
                    });
                    return [4 /*yield*/, __await(rowObj_1)];
                case 4: return [4 /*yield*/, _d.sent()];
                case 5:
                    _d.sent();
                    _d.label = 6;
                case 6: return [3 /*break*/, 1];
                case 7: return [3 /*break*/, 14];
                case 8:
                    e_4_1 = _d.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 14];
                case 9:
                    _d.trys.push([9, , 12, 13]);
                    if (!(_b && !_b.done && (_c = _a["return"]))) return [3 /*break*/, 11];
                    return [4 /*yield*/, __await(_c.call(_a))];
                case 10:
                    _d.sent();
                    _d.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    if (e_4) throw e_4.error;
                    return [7 /*endfinally*/];
                case 13: return [7 /*endfinally*/];
                case 14: return [2 /*return*/];
            }
        });
    });
}
exports.readRowObjects = readRowObjects;
function readAllRowObjects(file) {
    var e_5, _a;
    return __awaiter(this, void 0, void 0, function () {
        var objs, _b, _c, obj, e_5_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    objs = [];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 6, 7, 12]);
                    _b = __asyncValues(readRowObjects(file));
                    _d.label = 2;
                case 2: return [4 /*yield*/, _b.next()];
                case 3:
                    if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                    obj = _c.value;
                    objs.push(obj);
                    _d.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_5_1 = _d.sent();
                    e_5 = { error: e_5_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _d.trys.push([7, , 10, 11]);
                    if (!(_c && !_c.done && (_a = _b["return"]))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(_b)];
                case 8:
                    _d.sent();
                    _d.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_5) throw e_5.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/, objs];
            }
        });
    });
}
exports.readAllRowObjects = readAllRowObjects;
