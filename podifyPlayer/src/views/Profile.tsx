import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import FavoriteTab from 'src/component/profile/FavoriteTab';
import PlaylistTab from 'src/component/profile/PlaylistTab';
import UploadsTab from 'src/component/profile/UploadsTab';
import React = require('react');
import HistoryTab from 'src/component/profile/HistoryTab';

interface Props {}

const Tab = createMaterialTopTabNavigator()

const Profile: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="Uploads" component={UploadsTab} />
        <Tab.Screen name="Playlist" component={PlaylistTab} />
        <Tab.Screen name="Favourites" component={FavoriteTab} />
        <Tab.Screen name="History" component={HistoryTab} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:20,
    marginTop:20
  },
});

export default Profile