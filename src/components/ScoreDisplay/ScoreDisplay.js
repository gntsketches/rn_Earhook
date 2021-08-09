import React from 'react'
import {
  Text, View, StyleSheet, 
} from 'react-native'
import { withGlobalContext } from '../../GlobalContext';

class ScoreDisplay extends React.Component {
  render() {
    const { 
      scoring, mode, currentLevel, currentLevelData,
    } = this.props.global

    const { matchNote, match, miss, nextLevelMatches } = currentLevelData

    let matchMissRatio 
    let ratioProgressInner
    if (match === 0 && miss === 0) {
      matchMissRatio = 0
      ratioProgressInner = 0
    } else if (match > 0 && miss === 0) {
      matchMissRatio = 'Perfect'
      ratioProgressInner = '100%'
    } else {
      matchMissRatio = Math.round(match/miss * 100) / 100
      ratioProgressInner = matchMissRatio * 10
      if (ratioProgressInner > 100) {
        ratioProgressInner = 100
      }
      ratioProgressInner = `${ratioProgressInner}%`
    }

    let nextLevelProgress
    if (nextLevelMatches === 0) {
      nextLevelProgress = 0
    } else if (nextLevelMatches > 10) {
      nextLevelProgress = '100%'
    } else {
      nextLevelProgressRatio = (nextLevelMatches/10) * 100
      nextLevelProgress = `${nextLevelProgressRatio}%`
    }


    return (
      <View style={styles.scoreDisplayMain}>
        <View style={styles.scoreDisplayLeft}>
          <View style={styles.scoreDisplayMatchAndMiss}>
            <Text style={styles.scoreDisplayMatchAndMissText}>Match: {match}</Text>
            <Text>Miss: {miss}</Text>
          </View>
          <View style={styles.scoreDisplayMatchMissRatio}>
            <Text>Match/Miss: {matchMissRatio}</Text>
          </View>
          <View style={styles.matchRatioProgressWrap}>
            <View style={styles.progressOuter}>
              <View style={[
                styles.progressInner,
                {width: ratioProgressInner}
              ]}/>
            </View>
          </View>
        </View>

        <View style={styles.scoreDisplayRight}>
          <Text> </Text>
          <View>
            <Text>Match '{matchNote}': {nextLevelMatches}/10</Text>
          </View>
          <View style={styles.matchRatioProgressWrap}>
            <View style={styles.progressOuter}>
              <View style={[
                styles.progressInner,
                {width: nextLevelProgress}
              ]}/>
            </View>
          </View>
        </View>
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
    alignItems: 'flex-start',
    width: '50%',
    paddingRight: 5,
  },
  scoreDisplayMatchAndMiss: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  scoreDisplayMatchAndMissText: {
    width: '50%',
  },
  scoreDisplayMatchMissRatio: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  matchRatioProgressWrap: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'pink',
    marginTop: 10,
  },
  progressOuter: {
    width: '100%',
    height: 20,
    borderColor: 'black',
    borderWidth: 1,
  },
  progressInner: {
    height: '100%',
    // width: `50%`,
    // width: width,
    backgroundColor: 'green',
  },
  scoreDisplayRight: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    width: '50%',
    paddingLeft: 5,
  },
})
