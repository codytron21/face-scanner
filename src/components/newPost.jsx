import { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
export default function NewPost({ image }) {
  const { url, width, height } = image;
  const imgRef = useRef();
  const canvasRef = useRef();
  const handleImage = async () => {
    const detections = await faceapi
      .detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(imgRef.current);
    //providing dimensions to the faceapi
    faceapi.matchDimensions(canvasRef.current, {
      width,
      height,
    });
    const resized = faceapi.resizeResults(detections, {
      width,
      height,
    });
    faceapi.draw.drawDetections(canvasRef.current, resized);
    faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
  };
  useEffect(() => {
    //we are using promise instead of async await as we want to load multiple resources.
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ])
        .then(handleImage)
        .catch((e) => console.log(e));
    };
    //we want to load the img first before the models get loaded.
    imgRef.current && loadModels();
  }, []);

  return (
    // <div className="app">
    //   <img
    //     crossOrigin="anonymous"
    //     ref={imgRef}
    //     src="https://images.unsplash.com/photo-1609440082470-106df86c0f6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=377&q=80"
    //     alt="peopleImage"
    //     width="377"
    //     height="581"
    //   />
    //   <canvas ref={canvasRef} width="377" height="581" />
    // </div>
    <div>
      {/* <div className="container">  */}
      <div className="center" style={{ width, height }}>
        <img
          ref={imgRef}
          crossOrigin="anonymous"
          src={url}
          alt=""
          className="imgPost"
        />
        <canvas ref={canvasRef} width={width} height={height} />
      </div>
    </div>
    // </div>
  );
}
