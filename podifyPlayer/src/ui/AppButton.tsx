import colors from "@utils/colors";
import { FC } from "react";
import React = require("react");
import { Pressable, StyleSheet, Text } from "react-native";
import Loader from "./Loader";

interface Props {
  title: string;
  onPress?(): void;
  busy?: boolean;
  borderRadius?: number;
}

const AppButton: FC<Props> = ({ title, onPress, busy,borderRadius }) => {
  return (
    <Pressable onPress={onPress} style={[styles.container,{
      borderRadius:borderRadius || 25
    }]}>
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
  },
  title: {
    color: colors.CONTRAST,
    fontSize: 18,
  },
});

export default AppButton;
