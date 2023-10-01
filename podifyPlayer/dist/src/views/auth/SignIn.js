"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuthFormContainer_1 = require("@components/AuthFormContainer");
var form_1 = require("@components/form");
var AuthInputField_1 = require("@components/form/AuthInputField");
var SubmitBtn_1 = require("@components/form/SubmitBtn");
var AppLink_1 = require("@ui/AppLink");
var PasswordVisibilityIcon_1 = require("@ui/PasswordVisibilityIcon");
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
    password: yup
        .string()
        .trim("Password is missing!")
        .min(8, "Password is too short!")
        .required("Password is required!"),
});
var initialValues = {
    email: "",
    password: "",
};
var SignIn = function (props) {
    var _a = React.useState(true), secureEntry = _a[0], setSecureEntry = _a[1];
    var navigation = (0, native_1.useNavigation)();
    return (React.createElement(form_1.default, { onSubmit: function (values) {
            console.log(values);
        }, initialValues: initialValues, validationSchema: signupSchema },
        React.createElement(AuthFormContainer_1.default, { heading: "Welcome back!", subHeading: "Jump back right where you left", children: React.createElement(react_native_1.View, { style: styles.formContainer },
                React.createElement(AuthInputField_1.default, { name: "email", placeholder: "john@email.com", label: "Email", keyboardType: "email-address", autoCapitalize: "none", containerStyle: styles.marginBottom }),
                React.createElement(AuthInputField_1.default, { name: "password", placeholder: "********", label: "Password", autoCapitalize: "none", secureTextEntry: secureEntry, containerStyle: styles.marginBottom, rightIcon: React.createElement(PasswordVisibilityIcon_1.default, { privateIcon: secureEntry }), onRightIconPress: function () {
                        setSecureEntry(!secureEntry);
                    } }),
                React.createElement(SubmitBtn_1.default, { title: "Sign in" }),
                React.createElement(react_native_1.View, { style: styles.linkContainer },
                    React.createElement(AppLink_1.default, { title: "I lost my password", onPress: function () {
                            navigation.navigate("Forgot");
                        } }),
                    React.createElement(AppLink_1.default, { title: "create your account", onPress: function () {
                            navigation.navigate("Signup");
                        } }))) })));
};
var styles = react_native_1.StyleSheet.create({
    // container: {
    //   flex: 1,
    //   backgroundColor: colors.PRIMARY,
    //   alignItems: "center",
    //   justifyContent: "center",
    // },
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
exports.default = SignIn;
