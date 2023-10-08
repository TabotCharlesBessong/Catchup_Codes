import { NavigationContainer } from "@react-navigation/native";
import { FC } from "react";
import { useSelector } from "react-redux";
import { getAuthState } from "src/store/auth";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import React = require("react");

interface Props {}

const Navigator: FC<Props> = (props) => {
  const { loggedIn } = useSelector(getAuthState);
  return (
    <NavigationContainer>
      {loggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};



export default Navigator;
