import React from 'react';

const VideoBackground = () => {
  return (
    <div className='main'>
      <video className="video-bg" autoPlay muted loop>
        <source src="C:/Users/ASUS/Documents/GitHub/react-interview/pagination/src/Big fails 😂😂😂 #shortsfails #shortvideo #failsvideo.mp4" type="video/mp4" />
        {/* Provide alternative video formats here if needed */}
        Your browser does not support the video tag.
      </video>
      <div className="content-area">
        {/* Your content goes here */}
      </div>
    </div>
  );
}

export default VideoBackground;
