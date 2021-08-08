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

    const { match, miss } = currentLevelData

    let matchMissRatio 
    if (match === 0 && miss === 0) matchMissRatio = 0
    else if (match > 0 && miss === 0) matchMissRatio = 'Perfect'
    else matchMissRatio = Math.round(match/miss * 100) / 100
    // console.log('matchMissRatio', matchMissRatio);
    let ratioProgressInner = matchMissRatio * 10
    if (ratioProgressInner === 0) ratioProgressInner = 0 
    else if (ratioProgressInner === 'Perfect') ratioProgressInner = '100%'
    else ratioProgressInner = `${ratioProgressInner}%`
    console.log('ratioProgressInner', ratioProgressInner);

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
          <View style={styles.matchRatioProgressWrap}>
            <View style={styles.progressOuter}>
              <View style={[
                styles.progressInner,
                {width: ratioProgressInner}
              ]}/>
            </View>
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
    width: '50%',
  },
  matchRatioProgressWrap: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    marginTop: 10,
  },
  progressOuter: {
    width: '90%',
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
})
