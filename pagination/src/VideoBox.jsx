import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js'; // Import hls.js library

const VideoBox = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [selectedResolution, setSelectedResolution] = useState('auto'); // Default to auto resolution
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    // Simulate uploading with a delay
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      setUploadProgress(Math.min(progress, 100));
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        transcodeVideo(selectedFile);
      }
    }, 500); // Simulate progress update every 500 milliseconds

    console.log('Uploading video:', selectedFile);
  };

  const transcodeVideo = async (videoFile) => {
    // Implement video transcoding logic here to convert the uploaded video to HLS format
    // This requires server-side processing using tools like FFmpeg or cloud-based services
    // Upon successful transcoding, set the URL of the transcoded video
    const transcodedVideoUrl = 'https://youtu.be/thMXb5r792s?si=0je3A5g0WeZbfDn_';
    setUploadedVideo(transcodedVideoUrl);
  };

  const handleResolutionChange = (resolution) => {
    setSelectedResolution(resolution);
    // Adjust video resolution here based on selected option
    // This logic depends on the transcoded video's available resolutions
  };

  useEffect(() => {
    if (uploadedVideo) {
      const video = videoRef.current;

      if (Hls.isSupported()) {
        hlsRef.current = new Hls();
        hlsRef.current.loadSource(uploadedVideo);
        hlsRef.current.attachMedia(video);
        hlsRef.current.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(error => {
            console.error("Error playing video:", error);
          });
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = uploadedVideo;
        video.addEventListener('loadedmetadata', () => {
          video.play().catch(error => {
            console.error("Error playing video:", error);
          });
        });
      }
    }
  }, [uploadedVideo]);

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
          <div>
            <button onClick={() => handleResolutionChange('auto')}>Auto</button>
            <button onClick={() => handleResolutionChange('360p')}>360p</button>
            <button onClick={() => handleResolutionChange('720p')}>720p</button>
            {/* Add additional resolution options as needed */}
          </div>
          <video controls ref={videoRef} width="400">
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default VideoBox;
