"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_icons_1 = require("@expo/vector-icons");
var colors_1 = require("@utils/colors");
var React = require("react");
var react_native_1 = require("react-native");
var PasswordVisibilityIcon = function (_a) {
    var privateIcon = _a.privateIcon;
    return (React.createElement(react_native_1.View, null, privateIcon ? (React.createElement(vector_icons_1.Entypo, { name: "eye", color: colors_1.default.SECONDARY, size: 30 })) : (React.createElement(vector_icons_1.Entypo, { name: "eye-with-line", color: colors_1.default.SECONDARY, size: 30 }))));
};
exports.default = PasswordVisibilityIcon;
var styles = react_native_1.StyleSheet.create({});
