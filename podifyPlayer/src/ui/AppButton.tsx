import colors from "@utils/colors";
import { FC } from "react";
import React = require("react");
import { Pressable, StyleSheet, Text } from "react-native";
import Loader from "./Loader";

interface Props {
  title: string;
  onPress?(): void;
  busy?: boolean;
}

const AppButton: FC<Props> = ({ title, onPress,busy }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {busy ? <Loader /> : <Text style={styles.title}>{title}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 45,
    backgroundColor: colors.SECONDARY,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  title: {
    color: colors.CONTRAST,
    fontSize: 18,
  },
});

export default AppButton;
