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

          <TouchableOpacity
            style={styles.keyAccidentalsOpacityPadding}
            onPress={()=> this.playPitch('C')}
          >
            <View style={[
              styles.keyNatural, 
              (activeNotes.includes('C')) ? styles.activeKey : null
            ]}>
              {/* <Text>C</Text> */}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyAccidentalsOpacity}
            onPress={()=> this.playPitch('D')}
          >
            <View style={[
              styles.keyNatural, 
              (activeNotes.includes('D')) ? styles.activeKey : null
            ]}>
              {/* <Text>C#</Text> */}
              {/* <Text>Db</Text> */}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyAccidentalsOpacity}
            onPress={()=> this.playPitch('E')}
          >
            <View style={[
              styles.keyNatural, 
              (activeNotes.includes('E')) ? styles.activeKey : null
            ]}>
              {/* <Text>D#</Text> */}
              {/* <Text>Eb</Text> */}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyAccidentalsOpacity}
            onPress={()=> this.playPitch('F')}
          >
            <View style={[
              styles.keyNatural, 
              (activeNotes.includes('F')) ? styles.activeKey : null
            ]}>
              {/* <Text>F</Text> */}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyAccidentalsOpacity}
            onPress={()=> this.playPitch('G')}
          >
            <View style={[
              styles.keyNatural, 
              (activeNotes.includes('G')) ? styles.activeKey : null
            ]}>
              {/* <Text>F#</Text> */}
              {/* <Text>Gb</Text> */}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyAccidentalsOpacity}
            onPress={()=> this.playPitch('A')}
          >
            <View style={[
              styles.keyNatural, 
              (activeNotes.includes('A')) ? styles.activeKey : null
            ]}>
              {/* <Text>G#</Text> */}
              {/* <Text>Ab</Text> */}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyAccidentalsOpacity}
            onPress={()=> this.playPitch('B')}
          >
            <View style={[
              styles.keyNatural, 
              (activeNotes.includes('B')) ? styles.activeKey : null
            ]}>
              {/* <Text>A#</Text> */}
              {/* <Text>Bb</Text> */}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyAccidentalsOpacityPadding}
            onPress={()=> this.playPitch('C8')}
          >
            <View style={[
              styles.keyNatural, 
              (activeNotes.includes('C8')) ? styles.activeKey : null
            ]}>
              {/* <Text>C</Text> */}
            </View>
          </TouchableOpacity>

        </View>

        <View style={styles.pianoNaturalsMain}>

          <TouchableOpacity
            style={styles.keyAccidentalsOpacity}
            onPress={()=> this.playPitch('C')}
          >
            <View style={[
              styles.keyNatural, 
              (activeNotes.includes('C')) ? styles.activeKey : null
            ]}>
              <Text>C</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyAccidentalsOpacity}
            onPress={()=> this.playPitch('D')}
          >
            <View style={[
              styles.keyNatural, 
              (activeNotes.includes('D')) ? styles.activeKey : null
            ]}>
              <Text>D</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyAccidentalsOpacity}
            onPress={()=> this.playPitch('E')}
          >
            <View style={[
              styles.keyNatural, 
              (activeNotes.includes('E')) ? styles.activeKey : null
            ]}>
              <Text>E</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyAccidentalsOpacity}
            onPress={()=> this.playPitch('F')}
          >
            <View style={[
              styles.keyNatural, 
              (activeNotes.includes('F')) ? styles.activeKey : null
            ]}>
              <Text>F</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyAccidentalsOpacity}
            onPress={()=> this.playPitch('G')}
          >
            <View style={[
              styles.keyNatural, 
              (activeNotes.includes('G')) ? styles.activeKey : null
            ]}>
              <Text>G</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyAccidentalsOpacity}
            onPress={()=> this.playPitch('A')}
          >
            <View style={[
              styles.keyNatural, 
              (activeNotes.includes('A')) ? styles.activeKey : null
            ]}>
              <Text>A</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyAccidentalsOpacity}
            onPress={()=> this.playPitch('B')}
          >
            <View style={[
              styles.keyNatural, 
              (activeNotes.includes('B')) ? styles.activeKey : null
            ]}>
              <Text>B</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyAccidentalsOpacity}
            onPress={()=> this.playPitch('C8')}
          >
            <View style={[
              styles.keyNatural, 
              (activeNotes.includes('C8')) ? styles.activeKey : null
            ]}>
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
  keyAccidentalsOpacityPadding: {
    flexGrow: 1,
  },
  keyAccidentalsOpacity: {
    flexGrow: 1,
  },
  keyPadding: {
    flexGrow: 1,
    backgroundColor: 'blue',
    // padding: 10,
    // width: 40,
    height: 100,
  },
  keyAccidentalWrap: {
    // padding: 10,
    height: 100,
    flexGrow: 1,
  },
  keyAccidental: {
    backgroundColor: '#000',
    color: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10,
    // width: 40,
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





          // <TouchableOpacity>
          //   <View style={styles.keyPadding}></View>
          // </TouchableOpacity>

          // <TouchableOpacity 
          //   style={styles.keyAccidentalWrap}
          //   onPress={()=> this.playPitch('Cs')}
          // >
          //   <View style={[
          //     styles.keyAccidental, 
          //     (activeNotes.includes('Cs')) ? styles.activeKey : null
          //   ]}>
          //     <Text>C#</Text>
          //     <Text>Db</Text>
          //   </View>
          // </TouchableOpacity>

          // <TouchableOpacity 
          //   style={styles.keyAccidentalWrap}
          //   onPress={()=> this.playPitch('Ds')}
          // >
          //   <View style={[
          //     styles.keyAccidental, 
          //     (activeNotes.includes('Ds')) ? styles.activeKey : null
          //   ]}>
          //     <Text>D#</Text>
          //     <Text>Eb</Text>
          //   </View>
          // </TouchableOpacity>

          // <TouchableOpacity>
          //   <View style={styles.keyPadding}></View>
          // </TouchableOpacity>

          // <TouchableOpacity 
          //   style={styles.keyAccidentalWrap}
          //   onPress={()=> this.playPitch('Fs')}
          // >
          //   <View style={[
          //     styles.keyAccidental, 
          //     (activeNotes.includes('Fs')) ? styles.activeKey : null
          //   ]}>
          //     <Text>F#</Text>
          //     <Text>Gb</Text>
          //   </View>
          // </TouchableOpacity>

          // <TouchableOpacity 
          //   style={styles.keyAccidentalWrap}
          //   onPress={()=> this.playPitch('Gs')}
          // >
          //   <View style={[
          //     styles.keyAccidental, 
          //     (activeNotes.includes('Gs')) ? styles.activeKey : null
          //   ]}>
          //     <Text>G#</Text>
          //     <Text>Ab</Text>
          //   </View>
          // </TouchableOpacity>

          // <TouchableOpacity 
          //   style={styles.keyAccidentalWrap}
          //   onPress={()=> this.playPitch('As')}
          // >
          //   <View style={[
          //     styles.keyAccidental, 
          //     (activeNotes.includes('As')) ? styles.activeKey : null
          //   ]}>
          //     <Text>A#</Text>
          //     <Text>Bb</Text>
          //   </View>
          // </TouchableOpacity>

          // <TouchableOpacity>
          //   <View style={styles.keyPadding}></View>
          // </TouchableOpacity>