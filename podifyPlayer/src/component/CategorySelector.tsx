import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "@utils/colors";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React = require("react");
import BasicModalContainer from "@ui/BasicModalContainer";

interface Props<T> {
  data: T[];
  visible?: boolean;
  title?: string;
  renderItem(item: T): JSX.Element;
  onSelect(item: T, index: number): void;
  onRequestClose?(): void;
}

const CategorySelector = <T extends any>({
  data,
  title,
  visible = false,
  renderItem,
  onSelect,
  onRequestClose,
}: Props<T>) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (item: T, index: number) => {
    setSelectedIndex(index);
    onSelect(item, index);
    onRequestClose && onRequestClose();
  };

  return (
    <BasicModalContainer visible={visible} onRequestClose={onRequestClose} >
      <Text style={styles.title}>{title}</Text>

      <ScrollView>
        {data.map((item, index) => {
          return (
            <Pressable
              onPress={() => handleSelect(item, index)}
              key={index}
              style={styles.selectorContainer}
            >
              {selectedIndex === index ? (
                <MaterialCommunityIcons
                  name="radiobox-marked"
                  color={colors.SECONDARY}
                />
              ) : (
                <MaterialCommunityIcons
                  name="radiobox-blank"
                  color={colors.SECONDARY}
                />
              )}
              {renderItem(item)}
            </Pressable>
          );
        })}
      </ScrollView>
    </BasicModalContainer>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.INACTIVE_CONTRAST,
    zIndex: -1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparet",
    zIndex: 1,
  },
  modal: {
    width: "90%",
    maxHeight: "50%",
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.CONTRAST,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.PRIMARY,
    paddingVertical: 10,
  },
  selectorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CategorySelector;
