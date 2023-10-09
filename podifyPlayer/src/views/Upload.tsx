import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "@utils/colors";
import { FC } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React = require("react");
import FileSelector from "src/component/FileSelector";

interface Props {}

const Upload: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.fileSelector} >
        <FileSelector
          icon={
            <MaterialCommunityIcons
              name="image-outline"
              size={35}
              color={colors.SECONDARY}
            />
          }
          btnTitle="Select Poster"
        />
        <FileSelector
          icon={
            <MaterialCommunityIcons
              name="file-music-outline"
              size={35}
              color={colors.SECONDARY}
            />
          }
          btnTitle="Select Audio"
          style={{marginLeft:20}}
        />
      </View>

      <View style={styles.formContainer} >
        <TextInput />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "flex-start",
    // justifyContent: 'space-around',
    // flexDirection:'row',
    // paddingTop:32,
    padding:36
  },
  fileSelector:{
    flexDirection:'row'
  },
  formContainer:{
    marginTop:20
  }
});

export default Upload;
