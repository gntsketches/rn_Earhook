import React from 'react';
import {NativeModules, Button} from 'react-native';

const NewModuleButton = () => {
  const {AudioModule} = NativeModules;

  const onPress = () => {
    console.log('We will invoke the native module here!');
    AudioModule.playPitch('C4');
  };

  return (
    <Button
      title="Click to invoke your native module!"
      color="#841584"
      onPress={onPress}
    />
  );
};

export default NewModuleButton;
