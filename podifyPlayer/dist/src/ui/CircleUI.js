"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var colors_1 = require("@utils/colors");
var React = require("react");
var react_native_1 = require("react-native");
var CircleUi = function (_a) {
    var size = _a.size, position = _a.position;
    var viewPostion = {};
    switch (position) {
        case "top-left":
            viewPostion = { top: -size / 2, left: -size / 2 };
            break;
        case "top-right":
            viewPostion = { top: -size / 2, right: -size / 2 };
            break;
        case "bottom-right":
            viewPostion = { bottom: -size / 2, right: -size / 2 };
            break;
        case "bottom-left":
            viewPostion = { bottom: -size / 2, left: -size / 2 };
            break;
    }
    return (React.createElement(react_native_1.View, { style: __assign({ width: size, height: size, position: "absolute" }, viewPostion) },
        React.createElement(react_native_1.View, { style: {
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: colors_1.default.SECONDARY,
                opacity: 0.3,
            } }),
        React.createElement(react_native_1.View, { style: {
                width: size / 1.5,
                height: size / 1.5,
                borderRadius: size / 2,
                backgroundColor: colors_1.default.SECONDARY,
                opacity: 0.3,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: [{ translateX: -size / 3 }, { translateY: -size / 3 }],
            } })));
};
var styles = react_native_1.StyleSheet.create({
    container: {},
});
exports.default = CircleUi;
