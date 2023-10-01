"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var formik_1 = require("formik");
var React = require("react");
var Form = function (props) {
    return (React.createElement(formik_1.Formik, { onSubmit: props.onSubmit, initialValues: props.initialValues, validationSchema: props.validationSchema }, props.children));
};
exports.default = Form;
