import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "@utils/colors";
import React = require("react");
import { FC } from "react";
import { View, StyleSheet, Text, Pressable, StyleProp, ViewStyle } from "react-native";
// import DocumentPicker from "react-native-document-picker";
import * as DocumentPicker from "expo-document-picker"
import client from "src/api/client";

interface Props {
  icon?:React.ReactNode
  btnTitle?:string
  style?:StyleProp<ViewStyle>
  onSelect(file:DocumentPicker.DocumentPickerAsset):void
  options:DocumentPicker.DocumentPickerOptions
}

const FileSelector: FC<Props> = ({icon,btnTitle,style,onSelect,options}) => {
  // const handleDocumentSelect = async () => {
  //   try {
  //     const document = await DocumentPicker.pick()
  //     console.log(document)
      
  //   } catch (error) {
  //     console.log(error)
  //     if(!DocumentPicker.isCancel(error)){
  //       console.log(error)
  //     }
  //   }
  // }

  // const selectDoc = async (type: "image" | "audio") => {
  //   let docType = "*/*";
  //   if (type === "image") docType = "image/*";
  //   if (type === "audio") docType = "audio/*";

  //   const docRes = await DocumentPicker.getDocumentAsync({
  //     type: docType,
  //   });
  //   return docRes
  // };
  const pickSomething = async () => {
    try {

      const docRes = await DocumentPicker.getDocumentAsync(options)
      const formData = new FormData()
      const file = docRes.assets[0]
      onSelect(file)

      const audioFile = {
        name:file.name.split(".")[0],
        uri:file.uri,
        type:file.mimeType,
        size:file.size
      }

      formData.append("audioFile",audioFile)
      console.log({formData})
      console.log({file})
      // const { data } = await client.post("/audio/create", formData, {
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      // console.log(data)
    } catch (error) {
      console.log('====================================');
      console.log("Error while selecting file: ",error);
      console.log('====================================');
    }
  }
  return (
    <Pressable style={[styles.btnContainer,style]} onPress={pickSomething} >
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
