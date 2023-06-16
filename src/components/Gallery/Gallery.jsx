import "./Gallery.css";

function Gallery({ images, removeImages, width, height }) {
  return (
    <div
      className="Gallery"
      style={{
        gridTemplateColumns: `repeat(auto-fit, ${width}px)`,
        gridAutoRows: `${height}px`,
      }}
    >
      {images.map((img, i) => {
        return <img className="Image" key={i} src={img} alt="" />;
      })}
    </div>
  );
}

export default Gallery;
