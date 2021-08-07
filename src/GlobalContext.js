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
    animationFrame: null,
    startTime: '',
    timestamp: '',
    callTime: '',
    responseTime: '', // is that needed?
    nextCallTime: null,
    // maxWaitTime: 4000,
    // callCount: 0,
    // callCountLimit: 3,
    // sameCallCount: 0,
    // sameCallLimit: 2,
    // callWasMatched: false,
    pickNewCallNote: true,
    callNote: '',
    mode: 'major',
    
    scoring,
  }
  
  get activeNotes() {
    const { mode, scoring } = this.state
    const currentModeNotes = modes[mode]
    const currentModeLevel = scoring[mode].level
    const activeNotes = currentModeNotes.filter((note, index) => index < currentModeLevel)
    console.log('>>>activeNotes', activeNotes);
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
      });
    }
  }

  step = (timestamp) => {
    // console.log('timestamp', timestamp);
    let { playing, nextCallTime } = this.state;
    // this.setState({ timestamp: timestamp })

    const now = Date.now()
    if (nextCallTime != null && now >= nextCallTime) {
      // console.log('sending call')
      this.sendCall();
      this.setState({
        nextCallTime: null,
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
    const { pickNewCallNote } = this.state
    let { callNote } = this.state
    if (pickNewCallNote) {
      callNote = this.pickNote()
    }
    // console.log('callNote', callNote);
    this.setState({
      callTime: Date.now(),
      callNote,
    })

    AudioModule.playPitch(callNote);
  }

  sendResponse = (responseNote) => {
    const { callNote, callTime, mode, scoring } = this.state

    const now = Date.now() // console.log('now', now);
    const nextCallInterval = now - callTime // console.log('nextCallInterval', nextCallInterval)
    const nextCallTime = now + nextCallInterval // console.log('nextCallTime', nextCallTime);

    const newLevelData = { ...this.currentLevelData }
    const newScoring = { ...scoring }
    let pickNewCallNote = false
    // console.log('newLevelData', newLevelData);

    if (responseNote === callNote) {
      pickNewCallNote = true
      newLevelData.match += 1
      if (this.checkForLevelAdvance(newLevelData)) {
        // unlock next level
        newScoring[mode].level += 1
      }
    } else {
      newLevelData.miss += 1
    }
    newScoring[mode].levelData[this.currentLevel-1] = newLevelData

    this.setState({
      nextCallTime,
      pickNewCallNote,
      scoring: newScoring,
    // })
    }, console.log('callback scoring', this.state.scoring[mode].levelData[this.currentLevel-1]))
  }

  checkForLevelAdvance(newLevelData) {
    const { match, miss } = newLevelData
    const matchToMissRatio = match/miss
    console.log('match/miss', matchToMissRatio);
    if (match >= 10 
      && (miss === 0 || matchToMissRatio >= 10)) {
        return true
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
