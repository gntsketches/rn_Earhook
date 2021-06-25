import React from 'react';
import { Text, View, Button } from 'react-native';

const Menu = ({route, navigation}) => {
  const { info } = route.params;

  return (
    <View>
      <Text>Menu</Text>
      <Text>{info}</Text>
      <Button
        title="Play"
        // onPress={() => navigation.goBack()}
        onPress={() => navigation.navigate('Play', {
          info: 'back from Menu',
        })}
      />
    </View>
  );
};

export default Menu;
