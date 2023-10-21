import { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import LatestUploads from "src/component/LatestUploads";
import React = require("react");
import RecommendedAudios from "src/component/RecommendedAudios";
import OptionsModal from "src/component/OptionsModal";
import colors from "@utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {}

const Home: FC<Props> = (props) => {
  // const onAudioPress = () => {

  // }

  // const onAudioLongPress = () => {};

  const [showOptions, setShowOptions] = React.useState(false);

  return (
    <View style={styles.container}>
      <LatestUploads
        onAudioLongPress={(item) => {
          // console.log("ouch");
          setShowOptions(true);
        }}
        onAudioPress={(item) => {
          console.log(item);
        }}
      />
      <RecommendedAudios
        onAudioLongPress={(item) => {
          // console.log("ouch");
          setShowOptions(true);
        }}
        onAudioPress={(item) => {
          console.log(item);
        }}
      />

      <OptionsModal
        visible={showOptions}
        onRequestClose={() => {
          setShowOptions(false);
        }}
        options={[
          {
            title: "Add to playlist",
            icon: "playlist-music",
            // onPress: handleOnAddToPlaylist,
          },
          {
            title: "Add to favorite",
            icon: "cards-heart",
            // onPress: handleOnFavPress,
          },
        ]}
        renderItem={(item) => {
          return (
            <Pressable style={styles.optionContainer}>
              <MaterialCommunityIcons
                size={24}
                color={colors.PRIMARY}
                name={item.icon}
              />
              <Text style={styles.optionLabel}>{item.title}</Text>
            </Pressable>
          );
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
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  optionLabel: { color: colors.PRIMARY, fontSize: 16, marginLeft: 5 },
});

export default Home;
