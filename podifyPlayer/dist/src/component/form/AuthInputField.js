"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppInput_1 = require("@ui/AppInput");
var colors_1 = require("@utils/colors");
var formik_1 = require("formik");
var React = require("react");
var react_native_1 = require("react-native");
var AuthInputField = function (props) {
    var _a = (0, formik_1.useFormikContext)(), handleChange = _a.handleChange, values = _a.values, errors = _a.errors, handleBlur = _a.handleBlur, touched = _a.touched;
    var label = props.label, placeholder = props.placeholder, autoCapitalize = props.autoCapitalize, keyboardType = props.keyboardType, secureTextEntry = props.secureTextEntry, containerStyle = props.containerStyle, name = props.name;
    var errorMsg = touched[name] && errors[name] ? errors[name] : "";
    return (React.createElement(react_native_1.View, { style: [styles.container, containerStyle] },
        React.createElement(react_native_1.View, { style: styles.labelContainer },
            React.createElement(react_native_1.Text, { style: styles.label }, label),
            React.createElement(react_native_1.Text, { style: styles.errorMsg }, errorMsg)),
        React.createElement(AppInput_1.default, { placeholder: placeholder, keyboardType: keyboardType, autoCapitalize: autoCapitalize, secureTextEntry: secureTextEntry, onChangeText: handleChange(name), value: values[name], onBlur: handleBlur(name) })));
};
var styles = react_native_1.StyleSheet.create({
    container: {},
    labelContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 5,
    },
    label: {
        color: colors_1.default.CONTRAST,
    },
    errorMsg: {
        color: colors_1.default.ERROR,
    },
});
exports.default = AuthInputField;
