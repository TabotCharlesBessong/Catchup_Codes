import PulseAnimationContainer from "@ui/PulseAnimationContainer";
import colors from "@utils/colors";
import React = require("react");
import { FC } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import catchAsyncError from "src/api/catchError";
import client from "src/api/client";
import LatestUploads from "src/component/LatestUploads";
import { useFetchLatestAudios } from "src/hooks/query";
import { upldateNotification } from "src/store/notification";

interface Props {}

const Home: FC<Props> = (props) => {
  const { data, isLoading } = useFetchLatestAudios();

  if (isLoading) {
    return (
      <PulseAnimationContainer>
        <Text
          style={{
            color: "white",
            fontSize: 32,
            textAlign: "center",
            alignSelf: "center",
            marginTop: 20,
          }}
        >
          Lauding....
        </Text>
      </PulseAnimationContainer>
    );
  }
  return (
    <View style={styles.container}>
      <LatestUploads />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
  },
});

export default Home;
