import { NavigationContainer } from "@react-navigation/native";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState, updateLoggedInState, updateProfile } from "src/store/auth";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import React = require("react");
import { Keys, getFromAsyncStorage } from "@utils/asyncStorage";
import client from "src/api/client";

interface Props {}

const Navigator: FC<Props> = (props) => {
  const dispatch = useDispatch()
  React.useEffect(() => {
    const fetchAuthInfo = async () => {
      try {
        const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
        if (!token) return null;

        const { data } = await client.get("/auth/is-auth", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        // console.log(data,"My auth profile");
        dispatch(updateProfile(data.profile))
        dispatch(updateLoggedInState(true))
      } catch (error) {
        console.log("Auth error: ", error);
      }
    };
    fetchAuthInfo();
  }, []);
  const { loggedIn } = useSelector(getAuthState);
  return (
    <NavigationContainer>
      {loggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Navigator;
