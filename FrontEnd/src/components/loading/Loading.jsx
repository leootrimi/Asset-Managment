import React from 'react';
import './Loading.css'; 

function Loading() {
  return (
    <div className="loading-container">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only"></span>
      </div>
      <h3 className="loading-text">Please wait, loading...</h3>
    </div>
  );
}

export default Loading;
