"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var native_1 = require("@react-navigation/native");
var react_native_1 = require("react-native");
var AuthNavigator_1 = require("src/navigation/AuthNavigator");
var colors_1 = require("./src/utils/colors");
var React = require("react");
function App() {
    return (React.createElement(native_1.NavigationContainer, null,
        React.createElement(AuthNavigator_1.default, null)));
}
exports.default = App;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors_1.default.ERROR,
        alignItems: "center",
        justifyContent: "center",
    },
});
