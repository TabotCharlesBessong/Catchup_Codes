"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppButton_1 = require("@ui/AppButton");
var formik_1 = require("formik");
var react_native_1 = require("react-native");
var SubmitBtn = function (props) {
    var handleSubmit = (0, formik_1.useFormikContext)().handleSubmit;
    return React.createElement(AppButton_1.default, { onPress: handleSubmit, title: props.title });
};
var styles = react_native_1.StyleSheet.create({
    container: {},
});
exports.default = SubmitBtn;
