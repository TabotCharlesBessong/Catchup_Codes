import PulseAnimationContainer from "@ui/PulseAnimationContainer";
import React = require("react");
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import catchAsyncError from "src/api/catchError";
import client from "src/api/client";
import { useFetchLatestAudios } from "src/hooks/query";
import { upldateNotification } from "src/store/notification";

interface Props {}

const Home: FC<Props> = (props) => {
  const { data, isLoading } = useFetchLatestAudios();

  // if (isLoading) {
    return (
      <PulseAnimationContainer>
        <Text
          style={{
            color: "white",
            fontSize: 32,
            textAlign: "center",
            alignSelf: "center",
            marginTop:20
          }}
        >
          Lauding....
        </Text>
      </PulseAnimationContainer>
    );
  // }
  return (
    <View style={styles.container}>
      {/* <Text>Hello Home</Text> */}
      {data?.map((item) => (
        <Text
          style={{
            color: "white",
            fontSize: 16,
            paddingVertical:10
          }}
          key={item.id}
        >
          {item.title}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 20,
  },
});

export default Home;
