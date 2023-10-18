import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppButton from "@ui/AppButton";
import { categories } from "@utils/categories";
import colors from "@utils/colors";
import { StatusBar } from "expo-status-bar";
import { FC, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import CategorySelector from "src/component/CategorySelector";
import FileSelector from "src/component/FileSelector";
import React = require("react");
import { DocumentPickerAsset } from "expo-document-picker";
import * as yup from "yup";
import Progress from "@ui/Progress";
import client from "src/api/client";
import { Keys, getFromAsyncStorage } from "@utils/asyncStorage";
import { mapRange } from "@utils/math";

interface FormFields {
  title: string;
  category: string;
  about: string;
  file?: DocumentPickerAsset;
  poster?: DocumentPickerAsset;
}

const defaultForm: FormFields = {
  title: "",
  category: "",
  about: "",
  file:undefined,
  poster:undefined
};

const audioSchema = yup.object().shape({
  title: yup.string().trim().required("title is missing"),
  category: yup.string().oneOf(categories, "category is missing"),
  about: yup.string().trim().required("about is missing"),
  file: yup.object().shape({
    uri: yup.string().required("Audio file is missing"),
    name: yup.string().required("Audio file is missing"),
    type: yup.string().required("Audio file is missing"),
    size: yup.number().required("Audio file is missing"),
  }),
  poster: yup.object().shape({
    uri: yup.string(),
    name: yup.string(),
    type: yup.string(),
    size: yup.number(),
  }),
});

interface Props {}

const Upload: FC<Props> = (props) => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [audioInfo, setAudioInfo] = useState({ ...defaultForm });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [busy, setBusy] = useState(false);

  const handleUpload = async () => {
    setBusy(true)
    try {
      const finalData = await audioSchema.validate(audioInfo);
      // console.log(data);
      const formData = new FormData();
      formData.append("title", finalData.title);
      formData.append("about", finalData.about);
      formData.append("category", finalData.category);
      formData.append("file",{
        name: finalData.file.name,
        type: finalData.file.type,
        uri: finalData.file.uri,
      });
      if(finalData.poster.uri){
        formData.append("poster",{
          name: finalData.poster.name,
          type: finalData.poster.type,
          uri: finalData.poster.uri,
        });
      }

      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN)
      const {data} = await client.post("/audio/create",formData,{
        headers:{
          Authorization:"Bearer " + token,
          "Content-Type":"multipart/form-data"
        },
        onUploadProgress(progressEvent){
          const uploaded = mapRange({
            inputMin:0,
            inputMax:progressEvent.total || 0,
            outputMin:0,
            outputMax:100,
            inputValue:progressEvent.loaded
          })

          if(uploaded >= 100){
            setAudioInfo({...defaultForm})
            setBusy(false)
          } 
          setUploadProgress(Math.floor(uploaded))
        }
      });
      console.log(data)
    } catch (error) {
      if (error instanceof yup.ValidationError)
        console.log("Validation error: ", error.message);
      else console.log(error);
    }
    setBusy(false)
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.fileSelctorContainer}>
        <FileSelector
          icon={
            <MaterialCommunityIcons
              name="image-outline"
              size={35}
              color={colors.SECONDARY}
            />
          }
          btnTitle="Select Poster"
          options={{ type: ["image/*"] }}
          onSelect={(poster) => {
            setAudioInfo({ ...audioInfo, poster });
          }}
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
          options={{ type: ["audio/*"] }}
          onSelect={(file) => {
            setAudioInfo({ ...audioInfo, file });
          }}
        />
      </View>

      <View style={styles.formContainer}>
        <TextInput
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          placeholder="Title"
          style={styles.input}
          onChangeText={(text) => {
            setAudioInfo({ ...audioInfo, title: text });
          }}
          value={audioInfo.title}
        />

        <Pressable
          onPress={() => {
            setShowCategoryModal(true);
          }}
          style={styles.categorySelector}
        >
          <Text style={styles.categorySelectorTitle}>Category</Text>
          <Text style={styles.selectedCategory}>{audioInfo.category}</Text>
        </Pressable>

        <TextInput
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          placeholder="About"
          style={styles.input}
          numberOfLines={10}
          multiline
          onChangeText={(text) => {
            setAudioInfo({ ...audioInfo, about: text });
          }}
          value={audioInfo.about}
        />

        <CategorySelector
          visible={showCategoryModal}
          onRequestClose={() => {
            setShowCategoryModal(false);
          }}
          title="Category"
          data={categories}
          renderItem={(item) => {
            return <Text style={styles.category}>{item}</Text>;
          }}
          onSelect={(item) => {
            setAudioInfo({ ...audioInfo, category: item });
          }}
        />

        <View style={{ marginVertical: 20 }}>
          {busy ? <Progress progress={uploadProgress} /> : null}
        </View>

        <AppButton
          busy={busy}
          borderRadius={7}
          title="Submit"
          onPress={handleUpload}
        />
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 30,
  },
  fileSelctorContainer: {
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
    textAlignVertical: "top",
  },
  category: {
    padding: 10,
    color: colors.PRIMARY,
  },
  categorySelector: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  categorySelectorTitle: {
    color: colors.CONTRAST,
  },
  selectedCategory: {
    color: colors.SECONDARY,
    marginLeft: 5,
    fontStyle: "italic",
  },
});

export default Upload;
