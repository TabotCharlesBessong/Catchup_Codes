"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colors_1 = require("@utils/colors");
var react_native_1 = require("react-native");
var AppButton = function (_a) {
    var title = _a.title, onPress = _a.onPress;
    return (React.createElement(react_native_1.Pressable, { onPress: onPress, style: styles.container },
        React.createElement(react_native_1.Text, { style: styles.title }, title)));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
        height: 45,
        backgroundColor: colors_1.default.SECONDARY,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
    title: {
        color: colors_1.default.CONTRAST,
        fontSize: 18,
    },
});
exports.default = AppButton;
