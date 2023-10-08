"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_icons_1 = require("@expo/vector-icons");
var colors_1 = require("@utils/colors");
var react_native_reanimated_1 = require("react-native-reanimated");
var React = require("react");
var Loader = function (_a) {
    var _b = _a.color, color = _b === void 0 ? colors_1.default.CONTRAST : _b;
    var intialRotation = (0, react_native_reanimated_1.useSharedValue)(0);
    var transform = (0, react_native_reanimated_1.useAnimatedStyle)(function () {
        return {
            transform: [{ rotate: "".concat(intialRotation.value, "deg") }],
        };
    });
    React.useEffect(function () {
        intialRotation.value = (0, react_native_reanimated_1.withRepeat)((0, react_native_reanimated_1.withTiming)(360), -1);
    }, []);
    return (React.createElement(react_native_reanimated_1.default.View, { style: transform },
        React.createElement(vector_icons_1.AntDesign, { name: "loading1", size: 24, color: color })));
};
exports.default = Loader;
