"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var client = axios_1.default.create({
    baseURL: "http://192.168.1.153:5000",
});
exports.default = client;
