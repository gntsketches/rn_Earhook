import React from 'react'
import {
  NativeModule, NativeModules,
  Text, View, StyleSheet, TouchableOpacity, Pressable
} from 'react-native'
import { withGlobalContext } from '../../GlobalContext';

class Piano extends React.Component {

  playPitch(note) {
    // console.log('playing note:', note)
    const {AudioModule} = NativeModules;

    AudioModule.playPitch(note);
    this.props.global.sendResponse()

  }

  render() {
    return (
      <View style={styles.pianoMain}>
        <TouchableOpacity
          onPress={()=> this.playPitch('C')}
        >
          <View style={styles.generate}>
            <Text style={{color:'#fff'}}>C</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default withGlobalContext(Piano)

const styles = StyleSheet.create({
  pianoMain: {
    backgroundColor: '#888',
  },
  generate: {
    backgroundColor: '#00bcd4',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  }
})
