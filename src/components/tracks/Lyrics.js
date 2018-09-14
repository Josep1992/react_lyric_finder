import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import axios from 'axios';

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {},
    spinner: false,
  };

  componentDidMount = async () => {
    try {
      this.setState({ spinner: true });
      //Request for lyrics
      const lyrics = await axios.get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
          this.props.match.params.id
        }&apikey=${process.env.REACT_APP_MM_KEY}`,
      );
      const lyricsResponse = await lyrics;

      //Request for track
      const track = axios.get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${
          this.props.match.params.id
        }&apikey=${process.env.REACT_APP_MM_KEY}`,
      );
      const trackResponse = await track;

      this.setState({
        lyrics: lyricsResponse.data.message.body.lyrics,
        track: trackResponse.data.message.body.track,
        spinner: setTimeout(() => {
          this.setState({ spinner: false });
        }, 1500),
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { spinner, lyrics, track } = this.state;
    return spinner ? (
      <Spinner />
    ) : (
      <Fragment>
        <Link to="/" className="btn btn-dark btn-sm mb-1">
          Back
        </Link>
        <div className="card p-1 text-center">
          <h2 className="card-header p-2">{track.track_name}</h2>
          <span className="h5 text-secondary mt-1">
            <i className="fas fa-user" /> {track.artist_name}
          </span>
          <span className="h5 text-secondary">
            <i className="fas fa-info-circle" /> {track.album_name}
          </span>
          <span className="h5 text-secondary">
            <i className="fas fa-star" /> {track.track_rating}
          </span>

          <div className="card-body">
            <p className="card-text">{lyrics.lyrics_body}</p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Lyrics;
