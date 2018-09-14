import React from 'react';
import spinner from '../../spinner.gif';

const Spinner = () => (
  <div>
    <img
      src={spinner}
      alt="Loader"
      style={{ width: '200px', display: 'block', margin: '50px auto' }}
    />
  </div>
);

export default Spinner;
