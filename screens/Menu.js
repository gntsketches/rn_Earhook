import React from 'react';
import { Text, View, Button } from 'react-native';

const Menu = ({route, navigation}) => {
  const { info } = route.params;
  console.log('route.params.info:', info);

  return (
    <View>
      <Text>Menu</Text>
      <Text>{info}</Text>
      <Button
        title="Play"
        // onPress={() => navigation.goBack()}
        onPress={() => navigation.navigate('Play', {
          info: 'params from Menu',
        })}
      />
    </View>
  );
};

export default Menu;
