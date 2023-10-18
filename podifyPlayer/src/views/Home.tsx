import React = require('react');
import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

interface Props {}

const Home: FC<Props> = (props) => {
  const dispatch = useDispatch()
  return (
    <View style={styles.container}>
      <Text>Hello Home</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    padding:10,
    marginTop:20
  },
});

export default Home