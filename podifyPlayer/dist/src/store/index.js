"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toolkit_1 = require("@reduxjs/toolkit");
var auth_1 = require("./auth");
var store = (0, toolkit_1.configureStore)({
    reducer: auth_1.default
});
exports.default = store;
