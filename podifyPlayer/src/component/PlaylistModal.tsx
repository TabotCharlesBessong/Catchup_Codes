import BasicModalContainer from '@ui/BasicModalContainer';
import colors from '@utils/colors';
import { FC, ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Playlist } from 'src/@types/audio';
import React = require('react');

interface Props {
  visible: boolean;
  onRequestClose(): void;
  list: Playlist[];
  onCreateNewPress(): void;
  onPlaylistPress(item: Playlist): void;
}

interface ListItemProps {
  title: string;
  icon: ReactNode;
  onPress?(): void;
}

const ListItem: FC<ListItemProps> = ({title, icon, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.listItemContainer}>
      {icon}
      <Text style={styles.listItemTitle}>{title}</Text>
    </Pressable>
  );
};

const PlayListModal: FC<Props> = ({
  list,
  visible,
  onCreateNewPress,
  onRequestClose,
  onPlaylistPress,
}) => {
  return (
    <BasicModalContainer visible={visible} onRequestClose={onRequestClose}>
      {/* we want to render playlists */}
      <ScrollView>
        {list.map(item => {
          return (
            <ListItem
              onPress={() => onPlaylistPress(item)}
              key={item.id}
              icon={
                <MaterialIcons
                  size={20}
                  name={item.visibility === 'public' ? 'public' : 'lock'}
                  color={colors.PRIMARY}
                />
              }
              title={item.title}
            />
          );
        })}
      </ScrollView>

      {/* create playlist (new) button */}
      <ListItem
        icon={<AntDesign size={24} name="plus" color={colors.PRIMARY} />}
        title="Create New"
        onPress={onCreateNewPress}
      />
    </BasicModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
  listItemContainer: {flexDirection: 'row', alignItems: 'center', height: 45},
  listItemTitle: {fontSize: 16, color: colors.PRIMARY, marginLeft: 5},
});

export default PlayListModal;
