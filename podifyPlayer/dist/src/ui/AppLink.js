"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colors_1 = require("@utils/colors");
var React = require("react");
var react_native_1 = require("react-native");
var AppLink = function (_a) {
    var title = _a.title, onPress = _a.onPress, _b = _a.active, active = _b === void 0 ? true : _b;
    return (React.createElement(react_native_1.Pressable, { onPress: active ? onPress : null, style: { opacity: active ? 1 : 0.4 } },
        React.createElement(react_native_1.Text, { style: styles.title }, title)));
};
var styles = react_native_1.StyleSheet.create({
    title: {
        color: colors_1.default.SECONDARY
    }
});
exports.default = AppLink;
