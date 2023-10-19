import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import AppContainer from "src/component/AppContainer";
import Navigator from "src/navigation";
import store from "src/store";
import colors from "./src/utils/colors";
import React = require("react");
import { QueryClient, QueryClientProvider } from "react-query";
// import { clearAsyncStorage } from "@utils/asyncStorage";

const queryClient = new QueryClient()

export default function App() {
  // clearAsyncStorage().then(() => {
  //   console.log("logout");
  // });
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient} >
        <AppContainer>
          <Navigator />
        </AppContainer>
      </QueryClientProvider>
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
