import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthState,
  updateBusyState,
  updateLoggedInState,
  updateProfile,
} from "src/store/auth";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import React = require("react");
import { Keys, getFromAsyncStorage } from "@utils/asyncStorage";
import client from "src/api/client";
import { View } from "react-native";
import Loader from "@ui/Loader";
import colors from "@utils/colors";

interface Props {}

const AppTheme = {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    background:colors.PRIMARY,
    primary:colors.CONTRAST
  }
}

const Navigator: FC<Props> = (props) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const fetchAuthInfo = async () => {
      dispatch(updateBusyState(true));
      try {
        const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
        if (!token) {
          return dispatch(updateBusyState(false));
        }

        const { data } = await client.get("/auth/is-auth", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        // console.log(data,"My auth profile");
        dispatch(updateProfile(data.profile));
        dispatch(updateLoggedInState(true));
      } catch (error) {
        console.log("Auth error: ", error);
      }
      dispatch(updateBusyState(false));
    };
    fetchAuthInfo();
  }, []);
  const { loggedIn, busy } = useSelector(getAuthState);
  return (
    <NavigationContainer theme={AppTheme} >
      {busy ? (
        <View
          style={{
            // ...StyleSheet.absoluteFillObject,
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: colors.OVERLAY,
            justifyContent: "center",
            alignItems: "center",
            zIndex:1
          }}
        >
          <Loader />
        </View>
      ) : null}
      {loggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Navigator;
