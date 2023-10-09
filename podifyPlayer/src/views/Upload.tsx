import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "@utils/colors";
import { FC } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React = require("react");
import FileSelector from "src/component/FileSelector";
import AppButton from "@ui/AppButton";

interface Props {}

const Upload: FC<Props> = (props) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.fileSelector}>
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
          style={{ marginLeft: 20 }}
        />
      </View>

      <View style={styles.formContainer}>
        <TextInput
          placeholder="Title"
          style={styles.input}
          placeholderTextColor={colors.INACTIVE_CONTRAST}
        />
        <TextInput
          placeholder="About"
          style={styles.input}
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          multiline
          numberOfLines={10}
        />
        <AppButton title="Submit" borderRadius={8} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "flex-start",
    // justifyContent: 'space-around',
    // flexDirection:'row',
    paddingTop: 32,
    padding: 12,
  },
  fileSelector: {
    flexDirection: "row",
  },
  formContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    borderRadius: 7,
    padding: 10,
    fontSize: 18,
    color: colors.CONTRAST,
    marginBottom:20,
    textAlignVertical:'top'
  },
});

export default Upload;
