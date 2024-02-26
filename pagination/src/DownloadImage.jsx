import React from 'react';

const DownloadImage = () => {
  const handleDownload = (fileUrl, fileName) => {
    fetch(fileUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Error fetching the file:', error);
      });
  };
 
  

  

  const handleDownloadImage = () => {
    handleDownload('https://static.wikia.nocookie.net/naruto/images/2/29/Storm_3_boxart.jpg/revision/latest?cb=20130111191948', `image.jpg`);
  };

  const handleDownloadTextFile = () => {
    handleDownload('Hello world', 'harshit.txt');
  };

  const handleDownloadPdf = () => {
    handleDownload('pagination/public/Resume (12).pdf', 'document.pdf'); //path,filename
  };

  return (
    <div className='download-container'>
      <button className='download-button' onClick={handleDownloadImage}>
        Download Image
      </button>
      <button className='download-button' onClick={handleDownloadTextFile}>
        Download Text File
      </button>
      <button className='download-button' onClick={handleDownloadPdf}>
        Download PDF
      </button>
    </div>
  );
};

export default DownloadImage;
