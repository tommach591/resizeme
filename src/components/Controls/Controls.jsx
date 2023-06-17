import { useState } from "react";
import "./Controls.css";

function Controls({
  images,
  width,
  height,
  setWidth,
  setHeight,
  insertImages,
  downloadImages,
  showIndex,
  setShowIndex,
}) {
  const [maintainRatio, setMaintainRatio] = useState(true);
  const defaultSizes = [28, 56, 112, 320];
  const min = 16;
  const max = 3000;

  return (
    <div className="Controls">
      <div className="Buttons">
        <input
          className="Button"
          type="file"
          accept="image/png"
          multiple
          onChange={(event) => {
            const newImages = [];
            for (let i = 0; i < event.target.files.length; i++) {
              newImages.push({
                src: URL.createObjectURL(event.target.files[i]),
                name: images.length + i,
              });
            }
            insertImages(newImages);
            event.target.value = "";
          }}
        />
        <h1 className="Download">Download</h1>
        <button
          className="Button"
          onClick={() => downloadImages()}
          disabled={images.length === 0}
        >
          Size
        </button>
        <button
          className="Button"
          onClick={() => downloadImages("TWITCH")}
          disabled={images.length === 0}
        >
          Twitch
        </button>
        <button
          className="Button"
          onClick={() => downloadImages("BADGES")}
          disabled={images.length === 0}
        >
          Badge
        </button>
      </div>
      <div className="Resize">
        <div className="Size">
          <h1>Width</h1>
          <input
            type="number"
            value={width}
            onChange={(event) => {
              let newValue = width;
              newValue =
                event.target.value < min
                  ? min
                  : event.target.value > max
                  ? max
                  : event.target.value;

              setWidth(newValue);
              if (maintainRatio) setHeight(newValue);
            }}
          />
        </div>
        <div className="Size">
          <h1>Height</h1>
          <input
            type="number"
            value={height}
            onChange={(event) => {
              let newValue = width;
              newValue =
                event.target.value < min
                  ? min
                  : event.target.value > max
                  ? max
                  : event.target.value;

              setHeight(newValue);
              if (maintainRatio) setWidth(newValue);
            }}
          />
        </div>
        <div className="Toggles">
          <div className="Checkbox">
            <h1>Maintain Ratio</h1>
            <input
              type="checkbox"
              checked={maintainRatio}
              onChange={() => {
                setMaintainRatio(!maintainRatio);
              }}
            />
          </div>
          <div className="Checkbox">
            <h1>Show Key</h1>
            <input
              type="checkbox"
              checked={showIndex}
              onChange={() => {
                setShowIndex(!showIndex);
              }}
            />
          </div>
        </div>
      </div>
      <div className="DefaultSizes">
        {defaultSizes.map((size, i) => {
          return (
            <div
              className="Default"
              key={i}
              onClick={() => {
                setWidth(size);
                setHeight(size);
              }}
            >
              {size}px
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Controls;
