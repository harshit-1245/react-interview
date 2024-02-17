import React, { useState } from 'react'

const ImageWithUrl = () => {
    const [imageUrl,setImageUrl]=useState("");
    const [uploadedImageUrl,setUploadedImageUrl]=useState("");

    const handleImageUrlChange = (e) => {
        setImageUrl(e.target.value);
      };
    
      const handleUpload = () => {
        setUploadedImageUrl(imageUrl);
      };
  return (
    <div>
      <h3>Image Uploader</h3>
      <input type='text' placeholder='enter image url' value={imageUrl} onChange={handleImageUrlChange}/>
      <button onClick={handleUpload}>Upload</button>

      {uploadedImageUrl && (
        <div>
            <h3>uploaded image:</h3>
            <img src={uploadedImageUrl} alt="uploaded image" />
        </div>
      )}
    </div>
  )
}

export default ImageWithUrl
