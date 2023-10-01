"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var native_stack_1 = require("@react-navigation/native-stack");
var ForgotPassword_1 = require("@views/auth/ForgotPassword");
var SignIn_1 = require("@views/auth/SignIn");
var Signup_1 = require("@views/auth/Signup");
var Verification_1 = require("@views/auth/Verification");
var React = require("react");
var Stack = (0, native_stack_1.createNativeStackNavigator)();
var AuthNavigator = function () {
    return (React.createElement(Stack.Navigator, { screenOptions: {
            headerShown: false
        } },
        React.createElement(Stack.Screen, { name: "Signin", component: SignIn_1.default }),
        React.createElement(Stack.Screen, { name: "Signup", component: Signup_1.default }),
        React.createElement(Stack.Screen, { name: "Forgot", component: ForgotPassword_1.default }),
        React.createElement(Stack.Screen, { name: "Verification", component: Verification_1.default })));
};
exports.default = AuthNavigator;
