"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var AuthFormContainer_1 = require("@components/AuthFormContainer");
var AppButton_1 = require("@ui/AppButton");
var AppLink_1 = require("@ui/AppLink");
var OTPField_1 = require("@ui/OTPField");
var react_native_1 = require("react-native");
var React = require("react");
var client_1 = require("src/api/client");
var colors_1 = require("@utils/colors");
var otpFields = new Array(6).fill("");
var Verification = function (_a) {
    var _b;
    var route = _a.route, navigation = _a.navigation;
    var _c = React.useState(__spreadArray([], otpFields, true)), otp = _c[0], setOtp = _c[1];
    var _d = React.useState(0), otpIndex = _d[0], setOtpIndex = _d[1];
    var inputRef = React.useRef(null);
    var _e = React.useState(false), isSubmitting = _e[0], setIsSubmitting = _e[1];
    var _f = React.useState(60), countDown = _f[0], setCountDown = _f[1];
    var _g = React.useState(false), canSendNewOTP = _g[0], setCanSendNewOTP = _g[1];
    var userInfo = route.params.userInfo;
    (_b = inputRef.current) === null || _b === void 0 ? void 0 : _b.focus;
    var handleChange = function (value, index) {
        var newOtp = __spreadArray([], otp, true);
        if (value === "Backspace") {
            // move to the previous
            if (!newOtp[index])
                setOtpIndex(index - 1);
            newOtp[index] = "";
        }
        else {
            // update otp and move further
            setOtpIndex(index + 1);
            newOtp[index] = value;
        }
        setOtp(__spreadArray([], newOtp, true));
    };
    var handlePaste = function (value) {
        if (value.length === 6) {
            react_native_1.Keyboard.dismiss();
            var newOtp = value.split("");
            setOtp(__spreadArray([], newOtp, true));
        }
    };
    var isValidOtp = otp.every(function (value) {
        return value.trim();
    });
    var handleSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isValidOtp)
                        return [2 /*return*/];
                    setIsSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client_1.default.post("/auth/verify-email", {
                            userId: userInfo.id,
                            token: otp.join(""),
                        })];
                case 2:
                    data = (_a.sent()).data;
                    console.log(data);
                    navigation.navigate("Signin");
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1, "Verification error");
                    return [3 /*break*/, 4];
                case 4:
                    setIsSubmitting(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var requestOTP = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setCountDown(60);
                    setCanSendNewOTP(false);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client_1.default.post("/auth/re-verify-email", { userId: userInfo.id })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.log("Requesting for new OTP", error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    React.useEffect(function () {
        var _a;
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, [otpIndex]);
    React.useEffect(function () {
        if (canSendNewOTP)
            return;
        var interval = setInterval(function () {
            if (countDown > 0) {
                setCountDown(function (old) { return old - 1; });
            }
        }, 1000);
        if (countDown === 0) {
            setCanSendNewOTP(true);
            clearInterval(interval);
        }
        return function () {
            clearInterval(interval);
        };
    }, [canSendNewOTP]);
    return (React.createElement(AuthFormContainer_1.default, { heading: "Please check your email", children: React.createElement(react_native_1.View, { style: styles.formContainer },
            React.createElement(react_native_1.View, { style: styles.inputContainer }, otpFields.map(function (_, index) { return (React.createElement(OTPField_1.default, { ref: otpIndex === index ? inputRef : null, key: index, onKeyPress: function (_a) {
                    var nativeEvent = _a.nativeEvent;
                    handleChange(nativeEvent.key, index);
                }, onChangeText: handlePaste, value: otp[index] || "" })); })),
            React.createElement(AppButton_1.default, { busy: isSubmitting, onPress: handleSubmit, title: "Verify Account" }),
            React.createElement(react_native_1.View, { style: styles.linkContainer },
                canSendNewOTP ? (React.createElement(react_native_1.Text, null)) : (React.createElement(react_native_1.Text, { style: { color: colors_1.default.SECONDARY, marginRight: 14 } },
                    countDown,
                    " sec")),
                React.createElement(AppLink_1.default, { active: canSendNewOTP, title: "resend otp", onPress: requestOTP }))) }));
};
var styles = react_native_1.StyleSheet.create({
    formContainer: {
        width: "100%",
        paddingHorizontal: 15, // padding in the x direction (left and the right)
    },
    marginBottom: {
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        width: "100%",
    },
    linkContainer: {
        marginTop: 20,
        width: "100%",
        justifyContent: "flex-end",
        flexDirection: "row",
    },
});
exports.default = Verification;
