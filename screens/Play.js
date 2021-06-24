import React from 'react';
import { Text, View, Button } from 'react-native';

const Play = (props) => {
  return (
    <View>
      <Text>Play</Text>
      <Button
        title="Menu"
        onPress={() => props.navigation.navigate('Menu')}
      />
    </View>
  );
};

export default Play;
