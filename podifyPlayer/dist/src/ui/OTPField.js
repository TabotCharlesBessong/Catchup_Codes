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
var OTPField = React.forwardRef(function (props, ref) {
    return (React.createElement(react_native_1.TextInput, __assign({}, props, { ref: ref, placeholder: "*", placeholderTextColor: colors_1.default.INACTIVE_CONTRAST, style: [styles.input, props.style], inputMode: "numeric", keyboardType: "numeric" })));
});
var styles = react_native_1.StyleSheet.create({
    container: {},
    input: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: colors_1.default.SECONDARY,
        borderWidth: 2,
        marginBottom: 12,
        textAlign: "center",
        color: colors_1.default.CONTRAST,
        fontSize: 18,
        lineHeight: 0,
    },
});
exports.default = OTPField;
