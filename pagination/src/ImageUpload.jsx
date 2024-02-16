import React, { useState } from 'react';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file selection
  const handleChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className='container'>
      <div className="inner-container">
        <h6>Browse Your File</h6>
        <div className="input-area">
          <input type='file' onChange={handleChange} accept=".pdf, .jpg, .jpeg, .png" />
        </div>
        <div className="file-info">
          {/* Display file */}
          {selectedFile && (
            <div>
              {selectedFile.type.includes('image') ? (
                <img src={URL.createObjectURL(selectedFile)} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px' }} />
              ) : (
                <embed src={URL.createObjectURL(selectedFile)} type="application/pdf" width="100%" height="600px" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
