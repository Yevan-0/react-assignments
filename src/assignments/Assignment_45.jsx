import { useState, useRef } from "react";
import "./Assignment_45.css";
import * as blazeface from "@tensorflow-models/blazeface";
import "@tensorflow/tfjs"; 

export default function Assignment_45() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [source, setSource] = useState(null);
  const fileInputRef = useRef(null);
  const [faces, setFaces] = useState([]);
  const imgRef = useRef(null);

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

  const handleDetect = async () => {
    if (!imgRef.current) return;

    try {
      const model = await blazeface.load();
      const predictions = await model.estimateFaces(imgRef.current, false);

      console.log("Predictions:", predictions);
      setFaces(predictions);
    } catch (err) {
      setError("Face detection Failed" + err.message);
      console.log(err)
    }
  }

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
            onClick={handleDetect}
          >
            Detect
          </button>
        </div>

        <div className="cont-bottom">
          {error && <p style={{ color: "red" }}>{error}</p>}
          {source && (
            <div style={{ position: "relative" }}>
              <img ref={imgRef} src={source} alt="preview" />
              {faces.map((face, i) => {
                const [x, y, width, height] = [
                  face.topLeft[0],
                  face.topLeft[1],
                  face.bottomRight[0] - face.topLeft[0],
                  face.bottomRight[1] - face.topLeft[1],
                ];
                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      border: "3px solid red",
                      left: x,
                      top: y,
                      width: width,
                      height: height,
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}