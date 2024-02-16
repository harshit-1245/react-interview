import React, { useState } from 'react';


const DragAndDrop = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [droppedImage, setDroppedImage] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    // Check if the dropped file is an image
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setDroppedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please drop an image file.');
    }
  };

  return (
    <div
      className={`image-container ${isDragging ? 'dragging' : ''}`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="image-box">
        {droppedImage ? (
          <img src={droppedImage} alt="Dropped" className="dropped-image" style={{ maxWidth: '100%', maxHeight: '200px' }} />
        ) : (
          <>
            <h3>Image Box here</h3>
            <p>Drag & Drop an image here</p>
          </>
        )}
      </div>
    </div>
  );
};

export default DragAndDrop;
