import { useState, useRef, useEffect } from "react";
import "./Assignment_45.css";
import * as faceapi from "face-api.js";

export default function Assignment_45() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [source, setSource] = useState(null);
  const fileInputRef = useRef(null);
  const [faces, setFaces] = useState([]);
  const imgRef = useRef(null);
  const modelRef = useRef(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [detecting, setDetecting] = useState(false);


  useEffect(() => {
    const loadModels = async () => {
      if (modelLoaded) return;

      const URL = process.env.PUBLIC_URL + "./models";
      await faceapi.nets.ssdMobilenetv1.loadFromUri(URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(URL);
      console.log("Models loaded", URL);
      setModelLoaded(true);
    };
    loadModels();
  }, [modelLoaded]);

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
    if (!modelLoaded) return;
    if (!imgRef.current) return;
    setDetecting(true);
    try {
      const detections = await faceapi
        .detectAllFaces(imgRef.current)
        .withFaceLandmarks();
      console.log("Predictions:", detections);
      setFaces(detections);

    } catch (err) {
      setError("Face detection Failed" + err.message);
      console.log(err)
    } finally {
      setDetecting(false)
    }
  }

  return (
    <div>
      {/* face recognition */}

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
            disabled={detecting}
          >
            Detect
          </button>
        </div>

        <div className="cont-bottom">
          {source && (
            <div style={{ position: "relative" }}>
              <img ref={imgRef} src={source} alt="preview" />
              {faces.map((face, i) => {
                const { x, y, width, height } = face.detection.box;
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
          {error && <p style={{ color: "red", fontSize: "12px", padding: "5px" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
}