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
var react_native_1 = require("react-native");
var AppInput = function (props) {
    return (React.createElement(react_native_1.TextInput, __assign({}, props, { placeholderTextColor: colors_1.default.INACTIVE_CONTRAST, style: [styles.input, props.style] })));
};
var styles = react_native_1.StyleSheet.create({
    input: {
        borderWidth: 2,
        borderColor: colors_1.default.SECONDARY,
        height: 45,
        borderRadius: 25,
        color: colors_1.default.CONTRAST,
        padding: 10,
    },
});
exports.default = AppInput;
