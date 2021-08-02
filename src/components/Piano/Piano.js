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
        <View style={styles.pianoAccidentalsMain}>
          <View style={styles.keyPadding}></View>
          <TouchableOpacity
            onPress={()=> this.playPitch('Cs')}
          >
            <View style={styles.keyAccidental}>
              <Text>C# Db</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=> this.playPitch('Ds')}
          >
            <View style={styles.keyAccidental}>
              <Text>D# Eb</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.keyAccidental}>
          </View>
          <TouchableOpacity
            onPress={()=> this.playPitch('Fs')}
          >
            <View style={styles.keyAccidental}>
              <Text>F# Gb</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=> this.playPitch('Gs')}
          >
            <View style={styles.keyAccidental}>
              <Text>G# Ab</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=> this.playPitch('As')}
          >
            <View style={styles.keyAccidental}>
              <Text>A# Bb</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.keyPadding}></View>
          <View style={styles.keyPadding}></View>
        </View>

        <View style={styles.pianoNaturalsMain}>
          <TouchableOpacity
            onPress={()=> this.playPitch('C')}
          >
            <View style={styles.keyNatural}>
              <Text>C</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=> this.playPitch('D')}
          >
            <View style={styles.keyNatural}>
              <Text>D</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=> this.playPitch('E')}
          >
            <View style={styles.keyNatural}>
              <Text>E</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=> this.playPitch('F')}
          >
            <View style={styles.keyNatural}>
              <Text>F</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=> this.playPitch('G')}
          >
            <View style={styles.keyNatural}>
              <Text>G</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=> this.playPitch('A')}
          >
            <View style={styles.keyNatural}>
              <Text>A</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=> this.playPitch('B')}
          >
            <View style={styles.keyNatural}>
              <Text>B</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=> this.playPitch('C8')}
          >
            <View style={styles.keyNatural}>
              <Text>C</Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>

    )
  }
}

export default withGlobalContext(Piano)

const styles = StyleSheet.create({
  pianoMain: {
    flexDirection: 'column',
  },
  pianoAccidentalsMain: {
    // backgroundColor: '#888',
    flexDirection: 'row',
    justifyContent: 'space-around',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  keyPadding: {
    // flex: 1,
    backgroundColor: 'blue',
    padding: 10,
    width: 40,
    height: 100,
  },
  keyAccidental: {
    // flex: 2,
    backgroundColor: '#000',
    color: '#fff',
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
  pianoNaturalsMain: {
    // backgroundColor: '#888',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  keyNatural: {
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
