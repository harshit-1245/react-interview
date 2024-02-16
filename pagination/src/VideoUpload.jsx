import React, { useState } from 'react';

const VideoUpload = () => {
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoChange = (event) => {
    const files = event.target.files;
    const videosArray = Array.from(files);
    setSelectedVideos(videosArray);
    setCurrentVideoIndex(0); // Reset current video index when new videos are selected
  };

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => Math.min(prevIndex + 1, selectedVideos.length - 1));
  };

  const handlePreviousVideo = () => {
    setCurrentVideoIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <>
      <div className="video-upload-container">
        <div className="video-box">
          {selectedVideos.length > 0 ? (
            <div>
              <video controls className="uploaded-video">
                <source src={URL.createObjectURL(selectedVideos[currentVideoIndex])} type={selectedVideos[currentVideoIndex].type} />
                Your browser does not support the video tag.
              </video>
              <div>
                <button onClick={handlePreviousVideo} disabled={currentVideoIndex === 0}>Previous</button>
                <button onClick={handleNextVideo} disabled={currentVideoIndex === selectedVideos.length - 1}>Next</button>
              </div>
            </div>
          ) : (
            <>
              <h3>Video Upload</h3>
              <p>Browse your video files</p>
            </>
          )}
        </div>
        <label htmlFor="file-upload" className="custom-file-upload">
          Select Video(s)
        </label>
        <input
          type="file"
          id="file-upload"
          accept="video/*"
          onChange={handleVideoChange}
          style={{ display: 'none' }}
          multiple
        />
      </div>
    </>
  );
};

export default VideoUpload;
