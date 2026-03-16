import { useState, useRef, useEffect } from "react";
import "./Assignment_45.css";
import * as faceapi from "face-api.js";

const eyesMiddleTop = 28;
const eyesMiddleBottom = 30;
const lipsBottom = 58;
const faceBottom = 9;
const rightEyeInner = 40;
const rightEyeOuter = 37;
const leftEyeInner = 43;
const leftEyeOuter = 46;


const getDistance = (a, b) =>
  Math.hypot(a.x - b.x, a.y - b.y);

const getOrientation = (positions, box) => {

  const pos_x = (box.right + box.left) / 2;
  const pos_y = (box.bottom + box.top) / 2;

  const rot_x_a = getDistance(
    positions[eyesMiddleBottom],
    positions[eyesMiddleTop]
  );
  const rot_x_b = getDistance(
    positions[lipsBottom],
    positions[faceBottom]
  );
  const rot_x = Math.asin(
    (0.5 - rot_x_b / (rot_x_a + rot_x_b)) * 2
  );

  const rot_y_a = getDistance(
    positions[rightEyeOuter],
    positions[rightEyeInner]
  );
  const rot_y_b = getDistance(
    positions[leftEyeInner],
    positions[leftEyeOuter]
  );
  const rot_y =
    Math.asin(
      (0.5 - rot_y_b / (rot_y_a + rot_y_b)) * 2
    ) * 2.5;

  const rot_z_y =
    positions[rightEyeOuter].y -
    positions[leftEyeOuter].y;

  const rot_z_d = getDistance(
    positions[rightEyeOuter],
    positions[leftEyeOuter]
  );

  const rot_z = Math.asin(rot_z_y / rot_z_d);

  const scale =
    getDistance(
      positions[rightEyeOuter],
      positions[leftEyeOuter]
    ) * 0.7;

  if (rot_y > 0.7 || rot_y < -0.7) return null;

  return {
    position: { x: pos_x, y: pos_y },
    rotation: { x: rot_x, y: rot_y, z: rot_z },
    scale: { x: scale, y: scale },
  };
};

export default function Assignment_45() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [source, setSource] = useState(null);
  const fileInputRef = useRef(null);
  const [faces, setFaces] = useState([]);
  const imgRef = useRef(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [detecting, setDetecting] = useState(false);


  useEffect(() => {
    const loadModels = async () => {
      if (modelLoaded) return;

      const URL = "/models";
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

      const results = detections.map(det => {
        const orientation = getOrientation(det.landmarks.positions, det.detection.box);
        return {
          ...det, orientation
        }
      })

      setFaces(results);
      console.log("Predictions:", detections);
      console.log(`results: ${results}`)
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
                const { rotation, scale } = face.orientation || {};
                if (!rotation) return null;

                const { x: rot_x, y: rot_y, z: rot_z } = rotation;
                const leftEye = face.landmarks.positions[leftEyeOuter];
                const rightEye = face.landmarks.positions[rightEyeOuter];
                const eyeCenterX = (leftEye.x + rightEye.x) / 2;
                const eyeCenterY = (leftEye.y + rightEye.y) / 2;
                
                return (
                  <div key={i} style={{ position: "absolute", left: x, top: y }}>
                    <div
                      style={{
                        border: "3px solid red",
                        width: width,
                        height: height,
                      }}
                    />
                    <div
                      className="filter"
                      style={{
                        position: "absolute",
                        left: eyeCenterX - scale.x / 2,
                        top: eyeCenterY - scale.y / 2,
                        width: scale.x,
                        height: scale.y,
                        transform: `rotate(${rot_z * 57.3}deg)`,
                        transformOrigin: "center center",
                      }}
                    >
                      <img
                        src="./sunglasses.png"
                        alt="sunglasses"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                  </div>
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