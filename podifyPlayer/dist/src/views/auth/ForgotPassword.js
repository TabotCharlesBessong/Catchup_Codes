"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuthFormContainer_1 = require("@components/AuthFormContainer");
var form_1 = require("@components/form");
var AuthInputField_1 = require("@components/form/AuthInputField");
var SubmitBtn_1 = require("@components/form/SubmitBtn");
var AppLink_1 = require("@ui/AppLink");
var react_native_1 = require("react-native");
var yup = require("yup");
var React = require("react");
var native_1 = require("@react-navigation/native");
var signupSchema = yup.object({
    email: yup
        .string()
        .trim("Email is missing!")
        .email("Invalid email!")
        .required("Email is required!"),
});
var initialValues = {
    email: "",
};
var ForgotPassword = function (props) {
    var navigation = (0, native_1.useNavigation)();
    return (React.createElement(form_1.default, { onSubmit: function (values) {
            console.log(values);
        }, initialValues: initialValues, validationSchema: signupSchema },
        React.createElement(AuthFormContainer_1.default, { heading: "Forgot Password", subHeading: "Ooops, did you forget your password, don't worry we will help you get back in", children: React.createElement(react_native_1.View, { style: styles.formContainer },
                React.createElement(AuthInputField_1.default, { name: "email", placeholder: "john@email.com", label: "Email", keyboardType: "email-address", autoCapitalize: "none", containerStyle: styles.marginBottom }),
                React.createElement(SubmitBtn_1.default, { title: "Send Link" }),
                React.createElement(react_native_1.View, { style: styles.linkContainer },
                    React.createElement(AppLink_1.default, { onPress: function () {
                            navigation.navigate("Signin");
                        }, title: "login into your account" }),
                    React.createElement(AppLink_1.default, { onPress: function () {
                            navigation.navigate("Signup");
                        }, title: "create your account" }))) })));
};
var styles = react_native_1.StyleSheet.create({
    formContainer: {
        width: "100%",
        paddingHorizontal: 15, // padding in the x direction (left and the right)
    },
    marginBottom: {
        marginBottom: 20,
    },
    linkContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20,
    },
});
exports.default = ForgotPassword;
