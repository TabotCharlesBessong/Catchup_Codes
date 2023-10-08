"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var client_1 = require("src/api/client");
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
var handleSubmit = function (values, actions) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // send the information to the api
                // fetch()
                actions.setSubmitting(true);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, client_1.default.post("/auth/sign-in", __assign({}, values))];
            case 2:
                data = (_a.sent()).data;
                console.log(data);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log("Signup error", error_1);
                return [3 /*break*/, 4];
            case 4:
                actions.setSubmitting(false);
                return [2 /*return*/];
        }
    });
}); };
var SignIn = function (props) {
    var _a = React.useState(true), secureEntry = _a[0], setSecureEntry = _a[1];
    var navigation = (0, native_1.useNavigation)();
    return (React.createElement(form_1.default, { onSubmit: handleSubmit, initialValues: initialValues, validationSchema: signupSchema },
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
