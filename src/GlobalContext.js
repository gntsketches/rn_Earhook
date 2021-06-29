import React from 'react';
import {
  NativeModule, NativeModules,
} from 'react-native'

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
    // pickNewCallNote: false,
    // target: '',
    // sameCallCount: 0,
    // sameCallLimit: 2,
    // callWasMatched: false,
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

  sendCall = () => {
    this.setState({
      callTime: Date.now()
    })

    AudioModule.playPitch('C');
  }

  sendResponse = () => {
    const { callTime } = this.state

    // console.log('sendResponse');
    const now = Date.now()
    // console.log('now', now);
    const nextCallInterval = now - callTime
    // console.log('nextCallInterval', nextCallInterval)
    const nextCallTime = now + nextCallInterval
    // console.log('nextCallTime', nextCallTime);
    this.setState({
      nextCallTime,
    })
  }


  render () {
    return (
      <GlobalContext.Provider
        value={{
          ...this.state,
          togglePlaying: this.togglePlaying,
          sendResponse: this.sendResponse,
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
