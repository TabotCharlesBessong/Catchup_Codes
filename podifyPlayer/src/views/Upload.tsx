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
};

interface Props {}

const Upload: FC<Props> = (props) => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [audioInfo, setAudioInfo] = useState({ ...defaultForm });

  const handleUpload = async () => {
    console.log({audioInfo},"audioInfo")
  }

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

        <View style={{ marginBottom: 20 }} />

        <AppButton borderRadius={7} title="Submit" onPress={handleUpload} />
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
