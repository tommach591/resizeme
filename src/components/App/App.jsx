import { useCallback, useRef, useState } from "react";
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

  const downloadImages = useCallback(
    (type) => {
      const zip = new JSZip();

      const loadImage = (zip, src, name, w, h) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onerror = reject;
          img.onload = () => {
            const imageWidth = img.width;
            const imageHeight = img.height;

            const aspectRatio = imageWidth / imageHeight;

            let maxWidth = w;
            let maxHeight = h;
            if (aspectRatio > 1) {
              maxHeight = w / aspectRatio;
            } else {
              maxWidth = h * aspectRatio;
            }

            const xOffset = (w - maxWidth) / 2;
            const yOffset = (h - maxHeight) / 2;

            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            canvas.width = w;
            canvas.height = h;
            ctx.clearRect(0, 0, w, h);
            ctx.drawImage(img, xOffset, yOffset, maxWidth, maxHeight);
            zip.file(
              `${name}_${w}x${h}px.png`,
              canvas.toDataURL().split(",")[1],
              {
                base64: true,
              }
            );
            resolve(img);
          };
        });
      };

      switch (type) {
        case "TWITCH": {
          const sizes = [28, 56, 112];
          Promise.all(
            images.map((src, i) => loadImage(zip, src, i, sizes[0], sizes[0]))
          ).then(() => {
            Promise.all(
              images.map((src, i) => loadImage(zip, src, i, sizes[1], sizes[1]))
            ).then(() => {
              Promise.all(
                images.map((src, i) =>
                  loadImage(zip, src, i, sizes[2], sizes[2])
                )
              ).then(() => {
                zip.generateAsync({ type: "blob" }).then((content) => {
                  saveAs(content, "images.zip");
                });
              });
            });
          });
          break;
        }
        case "BADGES": {
          const sizes = [28, 56, 112];
          Promise.all(
            images.map((src, i) => loadImage(zip, src, i, sizes[0], sizes[0]))
          ).then(() => {
            Promise.all(
              images.map((src, i) => loadImage(zip, src, i, sizes[1], sizes[1]))
            ).then(() => {
              Promise.all(
                images.map((src, i) =>
                  loadImage(zip, src, i, sizes[2], sizes[2])
                )
              ).then(() => {
                zip.generateAsync({ type: "blob" }).then((content) => {
                  saveAs(content, "images.zip");
                });
              });
            });
          });
          break;
        }
        default: {
          Promise.all(
            images.map((src, i) => loadImage(zip, src, i, width, height))
          ).then(() => {
            zip.generateAsync({ type: "blob" }).then((content) => {
              saveAs(content, "images.zip");
            });
          });
          break;
        }
      }
    },
    [images, width, height]
  );

  return (
    <div
      className="App"
      style={{
        background: background,
        color: background === "#FFFFFF" ? "black" : "white",
        borderColor: background === "#FFFFFF" ? "black" : "white",
      }}
    >
      <div
        className="Header"
        style={{
          background: background,
        }}
      >
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

