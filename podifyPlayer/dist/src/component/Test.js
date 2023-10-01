"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var Test = function (props) {
    return (React.createElement(react_native_1.View, { style: styles.container },
        React.createElement(react_native_1.Text, null, "Hello Test")));
};
var styles = react_native_1.StyleSheet.create({
    container: {},
});
exports.default = Test;
