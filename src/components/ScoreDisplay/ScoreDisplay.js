import React from 'react'
import {
  Text, View, StyleSheet, 
} from 'react-native'
import { withGlobalContext } from '../../GlobalContext';

class ScoreDisplay extends React.Component {
  render() {
    const { 
      scoring, mode, currentLevel, currentMatchCount 
    } = this.props.global

    const { match, miss } = currentMatchCount

    let matchMissRatio 
    if (match === 0 && miss === 0) matchMissRatio = 0
    else if (match > 0 && miss === 0) matchMissRatio = 'Perfect'
    else matchMissRatio = Math.round(match/miss * 100) / 100

    return (
      <View style={styles.scoreDisplayMain}>
        <View style={styles.scoreDisplayLeft}>
          <View style={styles.scoreDisplayMatchAndMiss}>
            <Text>Match: {match}</Text>
            <Text>Miss: {miss}</Text>
          </View>
          <View style={styles.scoreDisplayMatchMissRatio}>
            <Text>Match/Miss: {matchMissRatio}</Text>
          </View>
        </View>
        <View><Text>Right</Text></View>
      </View>
    )
  }
}

export default withGlobalContext(ScoreDisplay)

const styles = StyleSheet.create({
  scoreDisplayMain: {
    backgroundColor: '#999',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,

  },
  scoreDisplayLeft: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
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
  }
})
