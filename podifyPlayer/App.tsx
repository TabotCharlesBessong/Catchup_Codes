import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import AuthNavigator from "src/navigation/AuthNavigator";
import colors from "./src/utils/colors";
import React = require("react");
import { Provider } from "react-redux";
import store from "src/store";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ERROR,
    alignItems: "center",
    justifyContent: "center",
  },
});
