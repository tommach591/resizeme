import "./Gallery.css";

function Gallery({ images, removeImage, width, height }) {
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
          <img
            className="Image"
            key={i}
            src={img}
            alt=""
            onClick={() => {
              removeImage(i);
            }}
          />
        );
      })}
    </div>
  );
}

export default Gallery;
