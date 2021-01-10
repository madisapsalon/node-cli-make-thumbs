#!/usr/bin/env node
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var path_1 = __importDefault(require("path"));
var lib_1 = require("./lib");
commander_1.default
    .version('1.0.0')
    .name('make-thumbs')
    .description('An image resizer to make thumbnails')
    .option('-s --source [folder])', 'Source image directory', 'images')
    .option('-d, --destination [folder]', 'Directory to be created for thumbnails', 'thumbnails')
    .parse(process.argv);
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var cwd, source, destination, srcPath, destPath, allFiles, imageFiles, confirmation, _i, imageFiles_1, image, src, dest, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 12, , 13]);
                cwd = process.cwd();
                source = commander_1.default.source, destination = commander_1.default.destination;
                srcPath = path_1.default.join(cwd, source);
                destPath = path_1.default.join(cwd, destination);
                if (!lib_1.directoryExists(destPath)) return [3 /*break*/, 2];
                return [4 /*yield*/, lib_1.rm(destPath)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [4 /*yield*/, lib_1.mkdir(destPath)];
            case 3:
                _a.sent();
                return [4 /*yield*/, lib_1.readdir(srcPath)];
            case 4:
                allFiles = _a.sent();
                imageFiles = lib_1.filterImageFiles(allFiles);
                return [4 /*yield*/, lib_1.confirmThumbnails(imageFiles)];
            case 5:
                confirmation = _a.sent();
                if (!confirmation) return [3 /*break*/, 10];
                _i = 0, imageFiles_1 = imageFiles;
                _a.label = 6;
            case 6:
                if (!(_i < imageFiles_1.length)) return [3 /*break*/, 9];
                image = imageFiles_1[_i];
                src = path_1.default.join(srcPath, image);
                dest = path_1.default.join(destPath, image);
                console.log("Creating thumbnail at: " + dest);
                return [4 /*yield*/, lib_1.thumbnail(src, dest)];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8:
                _i++;
                return [3 /*break*/, 6];
            case 9:
                console.log('Thumbnails created successfully!');
                return [3 /*break*/, 11];
            case 10:
                console.log('You cancelled thumbnails generating');
                _a.label = 11;
            case 11: return [3 /*break*/, 13];
            case 12:
                error_1 = _a.sent();
                console.log("Error creating thumbnails.\n    " + error_1);
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}); };
(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, main()];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); })();
