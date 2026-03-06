import { useState, useRef } from "react";
import "./Assignment_45.css";

export default function Assignment_45() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [source, setSource] = useState(null);
  const fileInputRef = useRef(null);

  const changeFile = (e) => {
    const file = e.target.files?.[0];

    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setError('');
      setSource(URL.createObjectURL(file));
    } else {
      setError('Select a valid image');
    }
  };

  const handleUpload = () => {
    fileInputRef.current.value = ""; 
    fileInputRef.current.click();
  };

  return (
    <div>
      <div className="container">
        <div className="cont-top">

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={changeFile}
            accept="image/*"
          />

          <div className="file-name">
            {selectedFile
              ? <p>Selected file: {selectedFile.name}</p>
              : <p>No file selected</p>}
          </div>

          <button
            onClick={handleUpload}
            className="upload-btn"
          >
            Upload
          </button>

          <button
            className="detect-btn"
          >
            Detect
          </button>
        </div>

        <div className="cont-bottom">
          {error && <p style={{ color: "red" }}>{error}</p>}
          {source && <img src={source} alt="preview" />}
        </div>
      </div>
    </div>
  );
}