import { FC } from "react";
import { StyleSheet, View } from "react-native";
import LatestUploads from "src/component/LatestUploads";
import React = require("react");
import RecommendedAudios from "src/component/RecommendedAudios";

interface Props {}

const Home: FC<Props> = (props) => {
  // const onAudioPress = () => {

  // }

  // const onAudioLongPress = () => {};

  return (
    <View style={styles.container}>
      <LatestUploads
        onAudioLongPress={(item) => {
          console.log("ouch");
        }}
        onAudioPress={(item) => {
          console.log(item);
        }}
      />
      <RecommendedAudios
        onAudioLongPress={(item) => {
          console.log("ouch");
        }}
        onAudioPress={(item) => {
          console.log(item);
        }}
      />
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
