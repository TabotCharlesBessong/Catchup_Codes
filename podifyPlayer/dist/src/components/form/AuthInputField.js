"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppInput_1 = require("@ui/AppInput");
var colors_1 = require("@utils/colors");
var formik_1 = require("formik");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_reanimated_1 = require("react-native-reanimated");
var AuthInputField = function (props) {
    var inputTransformValue = (0, react_native_reanimated_1.useSharedValue)(0);
    var _a = (0, formik_1.useFormikContext)(), handleChange = _a.handleChange, values = _a.values, errors = _a.errors, handleBlur = _a.handleBlur, touched = _a.touched;
    var label = props.label, placeholder = props.placeholder, autoCapitalize = props.autoCapitalize, keyboardType = props.keyboardType, secureTextEntry = props.secureTextEntry, containerStyle = props.containerStyle, name = props.name, rightIcon = props.rightIcon, onRightIconPress = props.onRightIconPress;
    var errorMsg = touched[name] && errors[name] ? errors[name] : '';
    var shakeUI = function () {
        inputTransformValue.value = (0, react_native_reanimated_1.withSequence)((0, react_native_reanimated_1.withTiming)(-10, { duration: 50 }), (0, react_native_reanimated_1.withSpring)(0, {
            damping: 8,
            mass: 0.5,
            stiffness: 1000,
            restDisplacementThreshold: 0.1,
        }));
    };
    var inputStyle = (0, react_native_reanimated_1.useAnimatedStyle)(function () {
        return {
            transform: [{ translateX: inputTransformValue.value }],
        };
    });
    (0, react_1.useEffect)(function () {
        if (errorMsg)
            shakeUI();
    }, [errorMsg]);
    return (React.createElement(react_native_reanimated_1.default.View, { style: [containerStyle, inputStyle] },
        React.createElement(react_native_1.View, { style: styles.labelContainer },
            React.createElement(react_native_1.Text, { style: styles.label }, label),
            React.createElement(react_native_1.Text, { style: styles.errorMsg }, errorMsg)),
        React.createElement(react_native_1.View, null,
            React.createElement(AppInput_1.default, { placeholder: placeholder, keyboardType: keyboardType, autoCapitalize: autoCapitalize, secureTextEntry: secureTextEntry, onChangeText: handleChange(name), value: values[name], onBlur: handleBlur(name) }),
            rightIcon ? (React.createElement(react_native_1.Pressable, { onPress: onRightIconPress, style: styles.rightIcon }, rightIcon)) : null)));
};
var styles = react_native_1.StyleSheet.create({
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
    },
    label: {
        color: colors_1.default.CONTRAST,
    },
    errorMsg: {
        color: colors_1.default.ERROR,
    },
    rightIcon: {
        width: 45,
        height: 45,
        position: 'absolute',
        top: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
exports.default = AuthInputField;
