import React, { useState } from 'react';

const VideoBox = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // Simulate uploading with a delay
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      setUploadProgress(Math.min(progress, 100));
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        setUploadedVideo(selectedFile); // Set the uploaded video once upload is complete
      }
    }, 500); // Simulate progress update every 500 milliseconds

    // Replace setTimeout with actual upload logic
    console.log('Uploading video:', selectedFile);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile || isUploading}>
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>
      {isUploading && (
        <div>
          <progress value={uploadProgress} max="100" />
          <span>{Math.round(uploadProgress)}% complete</span>
        </div>
      )}
      {uploadedVideo && (
        <div>
          <h3>Uploaded Video:</h3>
          <video controls width="400">
            <source src={URL.createObjectURL(uploadedVideo)} type={uploadedVideo.type} />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default VideoBox;
