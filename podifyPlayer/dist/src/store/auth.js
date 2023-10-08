"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.updateLoggedInState = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    profile: null,
    loggedIn: false,
};
var slice = (0, toolkit_1.createSlice)({
    name: "auth",
    initialState: initialState,
    reducers: {
        updateProfile: function (authState, _a) {
            var payload = _a.payload;
            authState.profile = payload;
        },
        updateLoggedInState: function (authState, _a) {
            var payload = _a.payload;
            authState.loggedIn = payload;
        },
    },
});
exports.updateLoggedInState = (_a = slice.actions, _a.updateLoggedInState), exports.updateProfile = _a.updateProfile;
var getAuthState = (0, toolkit_1.createSelector)(function (state) {
    return state.
    ;
}, function () {
    return;
});
exports.default = slice.reducer;
