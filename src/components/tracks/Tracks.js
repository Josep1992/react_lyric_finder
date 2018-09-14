import React, { Component, Fragment } from 'react';
import { Consumer } from '../../context';
import Track from './Track';
import Spinner from '../layout/Spinner';

class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {(value) => {
          const { heading, spinner, track_list } = value;
          return spinner ? (
            <Spinner />
          ) : (
            <Fragment>
              <h3 className="text-center">{heading}</h3>
              <div className="row">
                {track_list.map((track) => (
                  <Track key={track.track.track_id} info={track} />
                ))}
              </div>
            </Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Tracks;
