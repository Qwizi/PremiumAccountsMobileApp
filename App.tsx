import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import api from './Api';

export default function App() {
  useEffect(() => {
    console.log(api)
  }, [])
  return (
    <View style={styles.container}>
      <Text>Open up Ap.tsx to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
