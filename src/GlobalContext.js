import React from 'react';
import {
  NativeModule, NativeModules,
} from 'react-native'
import modes from './modes'
import scoring from './scoring'

const {AudioModule} = NativeModules;
const GlobalContext = React.createContext({});


/* STATE
// ENGINE (GAME LOOP) VALUES
private long maxWaitTime = 4000;
private boolean started = false;
private long noteCalledTime = 0;  // probably better to manage this with the Long class and null
private long noteResponseTime = 0;
private long nextCallTime = 999999999;
private int callCount = 0;
private int callCountLimit = 3;
private boolean pickNewCallNote = false;
private String target;
private int sameCallCount = 0;
private int sameCallLimit = 2;
private boolean callWasMatched = false;
// SAVED STATE
private SavedState savedState;
// MODES MAP
HashMap<String, Mode> modesMap = new HashMap<String, Mode>(){};
*/
export class GlobalContextProvider extends React.Component {
  state = {
    playing: false, // started: false,
    animationFrame: null, // is a reference to animationFrame needed?
    startTime: '',
    timestamp: '',
    callTime: '',
    callNote: null,
    nextCallTime: null,
    callWasMatched: false,
    maxWaitTime: 4000,
    callCount: 0,
    callCountLimit: 3,
    mode: 'major',
    scoring,
    // responseTime: '', // is that needed?
    // sameCallCount: 0,
    // sameCallLimit: 2,
    // pickNewCallNote: true,
  }
  
  get activeNotes() {
    const { mode, scoring } = this.state
    const currentModeNotes = modes[mode]
    const currentModeLevel = scoring[mode].level
    const activeNotes = currentModeNotes.filter((note, index) => index < currentModeLevel)
    // console.log('>>>activeNotes', activeNotes);
    return activeNotes
  }

  get currentLevel() {
    const { mode, scoring } = this.state
    const currentLevel = scoring[mode].level
    return currentLevel
  }

  get currentLevelData() {
    const { mode, scoring } = this.state
    const currentLevel = scoring[mode].level
    // console.log('currentLevel', currentLevel);
    return scoring[mode].levelData[currentLevel-1]
  }
  
  togglePlaying = () => {
    const { playing } = this.state;
    if (!playing) {
      this.setState({
        playing: true,
        // animationFrame: requestAnimationFrame(this.step), // is it necessary to store a reference? better to use a ref?
        startTime: Date.now(),
      });
      requestAnimationFrame(this.step) // is it necessary to store a reference? better to use a ref?

      this.sendCall();
    } else {
      // cancelAnimationFrame(this.state.animationFrame) // is it actually necessary to cancelAnimationFrame?
      this.setState({
        playing: false,
        animationFrame: null,
        startTime: '',
        nextCallTime: null,
        callNote: null,
        callCount: 0,
        callWasMatched: false,
        // any other resets?
      });
    }
  }

  step = (timestamp) => {
    // console.log('timestamp', timestamp);
    let { playing, nextCallTime, maxWaitTime } = this.state;
    // this.setState({ timestamp: timestamp })

    const now = Date.now()
    if (nextCallTime != null && now >= nextCallTime) {
      // console.log('sending call')
      this.sendCall();
      this.setState({
        nextCallTime: now + maxWaitTime,
      })
    }

    if (playing) {
      requestAnimationFrame(this.step); // this rAF has no reference...
    }
  }

  pickNote = () => {
    const modeNotes = this.activeNotes
    // console.log('modeNotes');
    const note = modeNotes[Math.floor(Math.random() * modeNotes.length)]
    return note
  }

  sendCall = () => {
    // const { pickNewCallNote } = this.state
    const { callWasMatched, maxWaitTime, callCount, callCountLimit } = this.state
    let { callNote } = this.state

    if (callCount >= callCountLimit) {
      this.togglePlaying()
      return
    }

    // if (pickNewCallNote) {
    //   callNote = this.pickNote()
    // }
    if (callWasMatched || callNote == null) {
      callNote = this.pickNote()
    }
    const now = Date.now() 
    const nextCallTime = now + maxWaitTime
    this.setState({
      callTime: Date.now(),
      callNote,
      callWasMatched: false,
      nextCallTime,
      callCount: callCount+1,
    })

    AudioModule.playPitch(callNote);
  }

  sendResponse = (responseNote) => {
    const { callNote, callTime, mode, scoring, callWasMatched } = this.state

    const now = Date.now() // console.log('now', now);
    const nextCallInterval = now - callTime // console.log('nextCallInterval', nextCallInterval)
    const nextCallTime = now + nextCallInterval // console.log('nextCallTime', nextCallTime);

    const newLevelData = { ...this.currentLevelData }
    // console.log('currentLevel', this.currentLevel);
    // console.log('newLevelData', newLevelData);
    const newScoring = { ...scoring }
    let pickNewCallNote = false
    let responseMatchedCall = false
    // console.log('newLevelData', newLevelData);

    if (callWasMatched) return
    
    if (responseNote === callNote) {
      responseMatchedCall = true
      // pickNewCallNote = true
      newLevelData.match += 1
    } else {
      newLevelData.miss += 1
    }
    newScoring[mode].levelData[this.currentLevel-1] = newLevelData

    this.setState({
      nextCallTime,
      pickNewCallNote,
      scoring: newScoring,
      callWasMatched: responseMatchedCall,
      callCount: 0,
    // })
    }, this.checkForLevelAdvance)

  }

  checkForLevelAdvance() {
    const { scoring, mode } = this.state
    const { match, miss } = this.currentLevelData
    const matchToMissRatio = match/miss
    // console.log('match/miss', matchToMissRatio);
    if (match >= 10 
      && (miss === 0 || matchToMissRatio >= 10)) {
        const newScoring = { ...scoring }
        newScoring[mode].level += 1
        this.setState({
          scoring: newScoring,
        })
    }
    return false
  }


  render () {
    return (
      <GlobalContext.Provider
        value={{
          ...this.state,
          togglePlaying: this.togglePlaying,
          sendResponse: this.sendResponse,
          activeNotes: this.activeNotes,
          currentLevel: this.currentLevel,
          currentLevelData: this.currentLevelData,
        }}
      >
        {this.props.children}
      </GlobalContext.Provider>
    )
  }
}

// create the consumer as higher order component
export const withGlobalContext = ChildComponent => props => (
  <GlobalContext.Consumer>
    {
      context => <ChildComponent {...props} global={context}  />
    }
  </GlobalContext.Consumer>
);
