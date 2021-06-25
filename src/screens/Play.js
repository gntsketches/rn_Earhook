import React from 'react';
import { Text, View, Button, ScrollView } from "react-native";

import { withGlobalContext } from '../GlobalContext';
import Piano1 from '../components/Piano1'


const Play = (props) => {
  console.log('Play props', props);

  const { route, navigation } = props;
  const { params } = route;
  console.log('params.info:', params.info);

  const startStopText = props.global.playing ? 'Stop' : 'Start'

  return (
    <View>
      <Text>Play</Text>
      <Text>Playing: {props.global.playing.toString()}</Text>
      <ScrollView>
        <Piano1 />
      </ScrollView>
      <Button
        title={startStopText}
        onPress={() => props.global.togglePlaying()}
      />
      <Button
        title="Menu"
        onPress={() => props.navigation.navigate('Menu', {
          info: 'params from Play',
        })}
      />
    </View>
  );
};

export default withGlobalContext(Play);
