import React from 'react';

const GlobalContext = React.createContext({});

export class GlobalContextProvider extends React.Component {
  state = {
    playing: false,
    // startTime: null,
    timestamp: '',
  }

  togglePlaying = () => {
    const { playing } = this.state;
    this.setState({ playing: !this.state.playing });
    if (!playing) {
      requestAnimationFrame(this.step);
    } else {

    }
  }

  step = (timestamp) => {
    // console.log('timestamp', timestamp);
    let { playing, startTime } = this.state;
    // if (startTime == null) {
    //   startTime = new Date();
    // }
    this.setState({ timestamp: timestamp })

    // const elapsed = timestamp - startTime;
    // console.log('elapsed', elapsed);


    if (playing) {
      requestAnimationFrame(this.step);
    }
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
