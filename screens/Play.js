import React from 'react';
import { Text, View, Button } from 'react-native';

const Play = (props) => {
  console.log('Play props', props);

  const { route, navigation } = props;

  const { params } = route;
  const { info } = params;
  console.log('params', params);
  // const info = params ? params.info : 'nope'


  return (
    <View>
      <Text>Play</Text>
      <Text>{info}</Text>
      <Button
        title="Menu"
        onPress={() => props.navigation.navigate('Menu', {
          info: 'test',
        })}
      />
      <Button
        title="App Log Test"
        onPress={() => params.appLogTest()}
      />
    </View>
  );
};

export default Play;
