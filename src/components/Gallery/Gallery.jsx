import "./Gallery.css";

function Gallery({ images, removeImage, width, height, showIndex }) {
  return (
    <div
      className="Gallery"
      style={{
        gridTemplateColumns: `repeat(auto-fit, ${width}px)`,
        gridAutoRows: `${height}px`,
      }}
    >
      {images.map((img, i) => {
        return (
          <div className="Image" key={i}>
            {showIndex && <h1>{i}</h1>}
            <img
              src={img.src}
              alt=""
              onClick={() => {
                removeImage(i);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Gallery;
