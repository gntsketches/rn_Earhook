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
    noteCalledTime: 0,
    // maxWaitTime: 4000,
    // noteResponseTime: 0,
    // nextCallTime: 999999999,
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
        animationFrame: requestAnimationFrame(this.step), // is it necessary to store a reference? better to use a ref?
        startTime: new Date,
      });

      this.sendCall();
    } else {
      cancelAnimationFrame(this.state.animationFrame) // is it actually necessary to cancelAnimationFrame?
      this.setState({
        playing: false,
        animationFrame: null,
        startTime: '',
      });
    }
  }

  step = (timestamp) => {
    // console.log('timestamp', timestamp);
    let { playing, startTime } = this.state;
    this.setState({ timestamp: timestamp })

    // const millis = new Date()
    // if (millis > nextCallTime) {
    //   console.log('sending call');
    //   this.sendCall();
    // }


    if (playing) {
      requestAnimationFrame(this.step); // this rAF has no reference...
    }
  }

  sendCall = () => {
    this.setState({
      startTime: new Date()
    })

    AudioModule.playPitch('C');
  }



  render () {
    return (
      <GlobalContext.Provider
        value={{
          ...this.state,
          togglePlaying: this.togglePlaying,
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
