"use strict";
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
var otpFields = new Array(6).fill("");
var Verification = function (props) {
    var _a;
    var _b = React.useState(__spreadArray([], otpFields, true)), otp = _b[0], setOtp = _b[1];
    var _c = React.useState(0), otpIndex = _c[0], setOtpIndex = _c[1];
    var inputRef = React.useRef(null);
    (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus;
    var handleChange = function (value, index) {
        var newOtp = __spreadArray([], otp, true);
        if (value === 'Backspace') {
            // move to the previous
            if (!newOtp[index])
                setOtpIndex(index - 1);
            newOtp[index] = '';
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
            var newOtp = value.split('');
            setOtp(__spreadArray([], newOtp, true));
        }
    };
    React.useEffect(function () {
        var _a;
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, [otpIndex]);
    return (React.createElement(AuthFormContainer_1.default, { heading: "Please check your email", children: React.createElement(react_native_1.View, { style: styles.formContainer },
            React.createElement(react_native_1.View, { style: styles.inputContainer }, otpFields.map(function (_, index) { return (React.createElement(OTPField_1.default, { ref: otpIndex === index ? inputRef : null, key: index, onKeyPress: function (_a) {
                    var nativeEvent = _a.nativeEvent;
                    handleChange(nativeEvent.key, index);
                }, onChangeText: handlePaste, value: otp[index] || '' })); })),
            React.createElement(AppButton_1.default, { title: "Verify Account" }),
            React.createElement(react_native_1.View, { style: styles.linkContainer },
                React.createElement(AppLink_1.default, { title: "resend otp" }))) }));
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
        alignItems: "flex-end",
    },
});
exports.default = Verification;
