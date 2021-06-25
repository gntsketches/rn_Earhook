import React from 'react';
import { Text, View, Button } from 'react-native';

import { withGlobalContext } from '../GlobalContext';


const Play = (props) => {
  console.log('Play props', props);

  const { route, navigation } = props;

  const { params } = route;
  const { state } = params;
  console.log('params', params);
  // const info = params ? params.info : 'nope'


  return (
    <View>
      <Text>Play</Text>
      <Text>Playing: {props.global.playing.toString()}</Text>
      <Button
        title="Playing"
        onPress={() => props.global.togglePlaying()}
      />
      <Button
        title="Menu"
        onPress={() => props.navigation.navigate('Menu', {
          info: 'test',
        })}
      />
    </View>
  );
};

export default withGlobalContext(Play);
