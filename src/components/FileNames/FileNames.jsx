import "./FileNames.css";

function FileNames({ images, background, updateImageName }) {
  return (
    <div
      className="FileNames"
      style={{
        background: background,
      }}
    >
      <div className="Title">File Names</div>
      <div className="ListOfNames">
        {images.map((src, i) => {
          return (
            <div className="Name" key={i}>
              <h1>{i}.</h1>
              <input
                type="text"
                value={src.name}
                onChange={(event) => {
                  updateImageName(i, event.target.value);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FileNames;
