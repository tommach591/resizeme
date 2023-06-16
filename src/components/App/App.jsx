import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import Gallery from "../Gallery";
import Controls from "../Controls";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import DragAndDrop from "../DragAndDrop/DragAndDrop";

function App() {
  const [images, setImages] = useState([]);
  const [width, setWidth] = useState(112);
  const [height, setHeight] = useState(112);
  const [background, setBackground] = useState("#FFFFFF");
  const canvasRef = useRef(null);

  const themes = ["#FFFFFF", "#313338", "#18181B"];

  const insertImages = useCallback(
    (newImages) => {
      setImages([...images, ...newImages]);
    },
    [images]
  );

  const removeImage = useCallback(
    (index) => {
      let newImages = [...images];
      newImages.splice(index, 1);
      setImages(newImages);
    },
    [images]
  );

  const handleUploadPNG = useCallback(
    (files) => {
      const newImages = [];
      for (let i = 0; i < files.length; i++) {
        if (files[i].type === "image/png")
          newImages.push(URL.createObjectURL(files[i]));
      }
      insertImages(newImages);
    },
    [insertImages]
  );

  const downloadImages = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const zip = new JSZip();

    const loadImage = (zip, src, i) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onerror = reject;
        img.onload = () => {
          const imageWidth = img.width;
          const imageHeight = img.height;

          const aspectRatio = imageWidth / imageHeight;

          let maxWidth = width;
          let maxHeight = height;
          if (aspectRatio > 1) {
            maxHeight = width / aspectRatio;
          } else {
            maxWidth = height * aspectRatio;
          }

          const xOffset = (width - maxWidth) / 2;
          const yOffset = (height - maxHeight) / 2;

          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(img, xOffset, yOffset, maxWidth, maxHeight);
          zip.file(`${i}.png`, canvas.toDataURL().split(",")[1], {
            base64: true,
          });
          resolve(img);
        };
      });

    Promise.all(images.map((src, i) => loadImage(zip, src, i))).then(() => {
      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, "images.zip");
      });
    });
  }, [images, width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }, [width, height]);

  return (
    <div
      className="App"
      style={{
        background: background,
        color: background === "#FFFFFF" ? "black" : "white",
        borderColor: background === "#FFFFFF" ? "black" : "white",
      }}
    >
      <div className="Header">
        <h1>Resize Me</h1>
        <div className="Themes">
          {themes.map((color) => (
            <div
              key={color}
              className="Color"
              style={{ background: color }}
              onClick={() => {
                setBackground(color);
              }}
            />
          ))}
        </div>
      </div>
      <canvas className="Canvas" ref={canvasRef} hidden />
      <Controls
        images={images}
        width={width}
        height={height}
        setWidth={setWidth}
        setHeight={setHeight}
        insertImages={insertImages}
        downloadImages={downloadImages}
      />
      <DragAndDrop handleUploadPNG={handleUploadPNG} />
      <Gallery
        images={images}
        removeImage={removeImage}
        width={width}
        height={height}
      />
    </div>
  );
}

export default App;

