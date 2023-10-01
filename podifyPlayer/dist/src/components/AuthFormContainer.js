"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CircleUI_1 = require("@ui/CircleUI");
var colors_1 = require("@utils/colors");
var React = require("react");
var react_native_1 = require("react-native");
var image_1 = require("src/constant/image");
var AuthFormContainer = function (_a) {
    var heading = _a.heading, subHeading = _a.subHeading, children = _a.children;
    return (React.createElement(react_native_1.View, { style: styles.container },
        React.createElement(CircleUI_1.default, { size: 100, position: "top-right" }),
        React.createElement(CircleUI_1.default, { size: 200, position: "bottom-right" }),
        React.createElement(CircleUI_1.default, { size: 200, position: "top-left" }),
        React.createElement(CircleUI_1.default, { size: 100, position: "bottom-left" }),
        React.createElement(react_native_1.View, { style: styles.headerContainer },
            React.createElement(react_native_1.Image, { source: image_1.default.logo }),
            React.createElement(react_native_1.Text, { style: styles.heading }, heading),
            React.createElement(react_native_1.Text, { style: styles.subHeading }, subHeading)),
        children));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors_1.default.PRIMARY,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15
    },
    heading: {
        color: colors_1.default.SECONDARY,
        fontSize: 25,
        fontWeight: "bold",
        paddingVertical: 5,
    },
    subHeading: { color: colors_1.default.CONTRAST, fontSize: 16 },
    headerContainer: {
        width: "100%",
        marginBottom: 20,
        paddingHorizontal: 20
    }
});
exports.default = AuthFormContainer;
