import React = require('react');
import {FC} from 'react';
import {View, StyleSheet,Text, Button} from 'react-native';
import { useDispatch } from 'react-redux';
import { upldateNotification } from 'src/store/notification';

interface Props {}

const Home: FC<Props> = (props) => {
  const dispatch = useDispatch()
  return (
    <View style={styles.container}>
      <Text>Hello Home</Text>
      <Button title='Test' onPress={() => {
        dispatch(upldateNotification({message:"Just for testing",type:'error'}))
      }} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {},
});

export default Home