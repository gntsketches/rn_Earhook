import React from 'react';

const GlobalContext = React.createContext({});

export class GlobalContextProvider extends React.Component {
  state = {
    playing: true
  }

  togglePlaying = () => {
    this.setState({ playing: !this.state.playing });
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
