import React from 'react';
import { CircularProgress } from '@material-ui/core';

const Loader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
    <CircularProgress />
  </div>
);

export default Loader;