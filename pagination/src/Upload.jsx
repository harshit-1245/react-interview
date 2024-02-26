import React, { useState } from 'react';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    // Simulate file upload
    const totalSize = file.size;
    let uploaded = 0;
    const interval = setInterval(() => {
      uploaded += 10000; // Simulate uploading 10KB at a time
      const currentProgress = Math.min(100, Math.round((uploaded / totalSize) * 100));
      setProgress(currentProgress);

      if (currentProgress === 100) {
        clearInterval(interval);
        setFile(null);
        setProgress(0);
        alert('File uploaded successfully!');
      }
    }, 100);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {file && (
        <div>
          <p>File selected: {file.name}</p>
          <div style={{ width: '100%', height: '20px', backgroundColor: '#f0f0f0', marginTop: '10px' }}>
            <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#007bff' }}></div>
          </div>
          <p>{progress}%</p>
        </div>
      )}
    </div>
  );
};

export default Upload;
