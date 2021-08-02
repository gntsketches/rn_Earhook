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
    this.props.global.sendResponse(note)
    
  }
  
  render() {
    const { activeNotes } = this.props.global

    return (
      <View style={styles.pianoMain}>
        <TouchableOpacity
          onPress={()=> this.playPitch('C')}
        >
          <View style={styles.key}>
            <Text>C</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=> this.playPitch('D')}
        >
          <View style={styles.key}>
            <Text>D</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=> this.playPitch('E')}
        >
          <View style={styles.key}>
            <Text>E</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=> this.playPitch('F')}
        >
          <View style={styles.key}>
            <Text>F</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=> this.playPitch('G')}
        >
          <View style={styles.key}>
            <Text>G</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=> this.playPitch('A')}
        >
          <View style={styles.key}>
            <Text>A</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=> this.playPitch('B')}
        >
          <View style={styles.key}>
            <Text>B</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=> this.playPitch('C8')}
        >
          <View style={styles.key}>
            <Text>C</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default withGlobalContext(Piano)

const styles = StyleSheet.create({
  pianoMain: {
    // backgroundColor: '#888',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  key: {
    backgroundColor: '#fff',
    color: 'black',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 40,
    height: 100,
    opacity: 0.5,
  },
  activeKey: {
    opacity: 1,
  },
})
