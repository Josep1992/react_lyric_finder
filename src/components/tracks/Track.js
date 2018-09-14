import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const Track = ({ info }) => (
  <Fragment>
    <div className="col-sm-6">
      <div className="card m-1 p-1">
        <div className="track-container card-body">
          <h5 className="card-title">{info.track.artist_name}</h5>
          <p className="track-info card-text">
            <i className="fas fa-play" /> <strong> Track: </strong>
            {info.track.track_name}
            <br />
            <i className="fas fa-info-circle" />
            <strong> Album: </strong>
            {info.track.album_name}
            <br />
            <i className="fas fa-star" />
            <strong> Rating: </strong>
            <span>{info.track.track_rating}</span>
            <br />
            <i className="fas fa-calendar" />
            <strong> Released: </strong>
            <span>
              <Moment format="MM/DD/YYYY">
                {info.track.first_release_date}
              </Moment>
            </span>
          </p>
          <Link
            to={`lyrics/track/${info.track.track_id}`}
            className="btn btn-sm btn-dark btn-block"
          >
            <i className="fas fa-chevron-right" /> View Lyrics
          </Link>
        </div>
      </div>
    </div>
  </Fragment>
);

export default Track;
