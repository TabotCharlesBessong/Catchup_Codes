import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "@utils/colors";
import React = require("react");
import { FC } from "react";
import { View, StyleSheet, Text, Pressable, StyleProp, ViewStyle } from "react-native";
import DocumentPicker from "react-native-document-picker";
// import * as DocumentPicker from "expo-document-picker"

interface Props {
  icon?:React.ReactNode
  btnTitle?:string
  style?:StyleProp<ViewStyle>
}

const FileSelector: FC<Props> = ({icon,btnTitle,style}) => {
  const handleDocumentSelect = async () => {
    try {
      const document = await DocumentPicker.pick()
      console.log(document)
      
    } catch (error) {
      console.log(error)
      if(!DocumentPicker.isCancel(error)){
        console.log(error)
      }
    }
  }
  return (
    <Pressable style={[styles.btnContainer,style]}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={styles.btnTitle}>{btnTitle}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {},
  btnContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    height: 70,
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  btnTitle: {
    color: colors.CONTRAST,
    marginTop: 5,
  },
});

export default FileSelector;
