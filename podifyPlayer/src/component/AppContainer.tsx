
import React = require('react');
import { FC } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

interface Props {
  children:React.ReactNode
}

const AppContainer: FC<Props> = ({children}) => {
  return (
    <SafeAreaView style={styles.container}>
      {children}
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex:1
  },
});

export default AppContainer