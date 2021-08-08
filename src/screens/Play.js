import React from 'react';
import { Text, View, Button, ScrollView, StyleSheet, Pressable } from "react-native";


import { withGlobalContext } from '../GlobalContext';
// import Piano1 from '../components/Piano1'
import ScoreDisplay from '../components/ScoreDisplay'
import Piano from '../components/Piano'


const Play = (props) => {
  // console.log('Play props', props);

  const { route, navigation } = props;
  const { params } = route;
  // console.log('params.info:', params.info);

  const startStopText = props.global.playing ? 'Stop' : 'Start'
  // const timestamp = props.global.timestamp

  return (
    <View style={styles.main}>
      <ScoreDisplay />
      <Text>Flair</Text>
      {/*<Text>Timestamp: {timestamp}</Text>*/}
      <Piano />
      {/*<ScrollView>*/}
      {/*  <Piano1 />*/}
      {/*</ScrollView>*/}
      <View style={styles.footer}>
        <Pressable style={styles.button} onPress={() => props.global.togglePlaying()}>
          <Text style={styles.text}>{startStopText}</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => props.navigation.navigate('Menu', {
            info: 'params from Play',
          })}
        >
          <Text style={styles.text}>Menu</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default withGlobalContext(Play);


const styles = StyleSheet.create({
  main: {
    flexDirection: "column",
    height: "100%",
    backgroundColor: "#aaa",
    justifyContent: "space-between",
  },
  footer: {
    // display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "40%",
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
})
