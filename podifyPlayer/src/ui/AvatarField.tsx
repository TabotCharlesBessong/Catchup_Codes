import { Entypo } from '@expo/vector-icons';
import colors from '@utils/colors';
import {FC} from 'react';
import React = require('react');
import {View, StyleSheet, Image} from 'react-native';

interface Props {
  source?: string;
}

const avatarSize = 70;

const AvatarField: FC<Props> = ({source}) => {
  return (
    <View>
      {source ? (
        <Image source={{uri: source}} style={styles.avatarImage} />
      ) : (
        <View style={styles.avatarImage}>
          <Entypo name="mic" size={30} color={colors.PRIMARY} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarImage: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
    backgroundColor: colors.SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.CONTRAST,
  },
});

export default AvatarField;
