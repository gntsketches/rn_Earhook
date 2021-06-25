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
      <Text>Playing: {state.playing.toString()}</Text>
      <Text>Is online: {props.global.isOnline.toString()}</Text>
      <Button
        title="Online"
        onPress={() => props.global.toggleOnline()}
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
