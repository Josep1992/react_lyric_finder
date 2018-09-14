import React, { Component, Fragment } from 'react';
import { Consumer } from '../../context';
import axios from 'axios';

class Search extends Component {
  state = {
    trackTitle: '',
    spinner: false,
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getTrackTitle = async (dispatch, e) => {
    e.preventDefault();

    if (this.state.trackTitle === '') {
      alert('Please enter a Song Title');
    } else {
      try {
        this.setState({ spinner: true });

        const trackTitleRequest = await axios.get(
          `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${
            this.state.trackTitle
          }&page_size=10&page=1&s_track_rating=desc&apikey=${
            process.env.REACT_APP_MM_KEY
          }`,
        );

        const trackTitleResponse = await trackTitleRequest;

        dispatch({
          type: 'SEARCH_TRACKS',
          payload: trackTitleResponse.data.message.body.track_list,
        });

        this.setState({
          trackTitle: '',
          spinner: setTimeout(() => this.setState({ spinner: false }), 1500),
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
  render() {
    return (
      <Consumer>
        {(context) => {
          const { dispatch } = context;

          return (
            <Fragment>
              <div className="card mb-4 p-4">
                <div className="card body">
                  <h1 className="display-4 text-center">
                    Search for a Song <i className="fas fa-music" />
                  </h1>
                  <p className="lead text-center">Get lyrics for any song</p>
                  <form onSubmit={this.getTrackTitle.bind(this, dispatch)}>
                    <div className="form-group p-2">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Song Name"
                        name="trackTitle"
                        value={this.state.trackTitle}
                        onChange={this.onChange}
                      />
                      <button
                        className="btn btn-lg btn-primary btn-block mt-3"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
