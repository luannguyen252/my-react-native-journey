import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
//Screens
import MenuScreen from './src/screens/MenuScreen';
import GameScreen from './src/screens/GameScreen';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(true); //TODO: sET THIS back to false

  if(isPlaying){
    return(
      <GameScreen setIsPlaying={setIsPlaying}/>
    );
  } else {
    return(
      <MenuScreen setIsPlaying={setIsPlaying}/>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
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
