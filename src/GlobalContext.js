import React from 'react';

const GlobalContext = React.createContext({});

export class GlobalContextProvider extends React.Component {
  state = {
    playing: false,
    animationFrame: null,
    startTime: '',
    timestamp: '',
  }

  togglePlaying = () => {
    const { playing } = this.state;
    if (!playing) {
      this.setState({
        playing: true,
        animationFrame: requestAnimationFrame(this.step),
        startTime: new Date,
      });
    } else {
      cancelAnimationFrame(this.state.animationFrame)
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
