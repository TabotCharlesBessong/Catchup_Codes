import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import store from "src/store";
import colors from "./src/utils/colors";
import React = require("react");
import Navigator from "src/navigation";
import AppContainer from "src/component/AppContainer";

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer>
        <Navigator />
      </AppContainer>
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
