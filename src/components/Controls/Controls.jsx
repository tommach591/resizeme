import "./Controls.css";

function Controls({ width, height, setWidth, setHeight, insertImages }) {
  const defaultSizes = [28, 56, 112, 320];

  return (
    <div className="Controls">
      <div className="Buttons">
        <input
          className="Button"
          type="file"
          accept="image/png"
          multiple
          onChange={(event) => {
            console.log(event.target.files.length);
            const images = [];
            for (let i = 0; i < event.target.files.length; i++) {
              images.push(URL.createObjectURL(event.target.files[i]));
            }
            insertImages(images);
            event.target.value = "";
          }}
        />
        <button className="Button">Download</button>
      </div>
      <div className="Resize">
        <div className="Size">
          <h1>Width</h1>
          <input
            type="number"
            value={width}
            onChange={(event) => {
              setWidth(event.target.value);
            }}
          />
        </div>
        <div className="Size">
          <h1>Height</h1>
          <input
            type="number"
            value={height}
            onChange={(event) => {
              setHeight(event.target.value);
            }}
          />
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
