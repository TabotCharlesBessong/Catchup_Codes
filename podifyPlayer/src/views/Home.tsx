import { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import LatestUploads from "src/component/LatestUploads";
import React = require("react");
import RecommendedAudios from "src/component/RecommendedAudios";
import OptionsModal from "src/component/OptionsModal";
import colors from "@utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { AudioData, Playlist } from "src/@types/audio";
import catchAsyncError from "src/api/catchError";
import { upldateNotification } from "src/store/notification";
import client from "src/api/client";
import { Keys, getFromAsyncStorage } from "@utils/asyncStorage";
import PlayListModal from "src/component/PlaylistModal";
import PlaylistForm, { PlaylistInfo } from "src/component/PlaylistForm";

interface Props {}

const Home: FC<Props> = (props) => {
  // const onAudioPress = () => {

  // }

  const handleOnLongPress = (audio: AudioData) => {
    setSelectedAudio(audio);
    setShowOptions(true);
  };

  const [showOptions, setShowOptions] = React.useState(false);
  const dispatch = useDispatch();
  const [selectedAudio, setSelectedAudio] = React.useState<AudioData>();

  const handleOnFavPress = async () => {
    if (!selectedAudio) return;
    // send request with the audio id that we want to add to fav

    try {
      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
  
      const { data } = await client.post(
        "/favorite?audioId=" + selectedAudio.id,
        null,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
  
      console.log(data);
      
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(upldateNotification({ message: errorMessage, type: "error" }));
    }


    setSelectedAudio(undefined);
    setShowOptions(false);
  };

  return (
    <View style={styles.container}>
      <LatestUploads
        onAudioLongPress={handleOnLongPress}
        onAudioPress={(item) => {
          console.log(item);
        }}
      />
      <RecommendedAudios
        onAudioLongPress={handleOnLongPress}
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
            onPress: handleOnFavPress,
          },
        ]}
        renderItem={(item) => {
          return (
            <Pressable onPress={item.onPress} style={styles.optionContainer}>
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
      {/* <PlayListModal
        visible
        onRequestClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        list={[
          { title: "Playlist one", visibility: "public", id: 1 },
          { title: "Playlist two", visibility: "private", id: 2 },
        ]}
        onPlaylistPress={function (item: Playlist): void {
          throw new Error("Function not implemented.");
        }}
      /> */}

      <PlaylistForm visible={true} onRequestClose={function (): void {
        throw new Error("Function not implemented.");
      } } onSubmit={function (value: PlaylistInfo): void {
        throw new Error("Function not implemented.");
      } } />
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
