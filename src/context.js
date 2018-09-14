import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_TRACKS':
      return {
        ...state,
        track_list: action.payload,
        heading: 'Search results',
      };

    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    track_list: [],
    heading: 'Top 10 Tracks',
    // spinner: false,
    dispatch: (action) => this.setState((state) => reducer(state, action)),
  };

  componentDidMount = async () => {
    try {
      // this.setState({ spinner: true });
      const request = await axios.get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${
          process.env.REACT_APP_MM_KEY
        }`,
      );
      const response = await request;

      this.setState({
        track_list: response.data.message.body.track_list,
        // spinner: setTimeout(() => this.setState({ spinner: false }), 1500),
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { children } = this.props;
    return <Context.Provider value={this.state}>{children}</Context.Provider>;
  }
}

export const Consumer = Context.Consumer;
