import "./Controls.css";

function Controls({
  images,
  width,
  height,
  setWidth,
  setHeight,
  insertImages,
  downloadImages,
  toggleShowIndex,
}) {
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
              event.target.value < min
                ? setWidth(min)
                : event.target.value > max
                ? setWidth(max)
                : setWidth(event.target.value);
            }}
          />
        </div>
        <div className="Size">
          <h1>Height</h1>
          <input
            type="number"
            value={height}
            onChange={(event) => {
              event.target.value < min
                ? setHeight(min)
                : event.target.value > max
                ? setHeight(max)
                : setHeight(event.target.value);
            }}
          />
        </div>
        <button className="ToggleNumbers" onClick={() => toggleShowIndex()}>
          Toggle Numbers
        </button>
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
