import { useCallback, useState } from "react";
import "./App.css";
import Gallery from "../Gallery";
import Controls from "../Controls";

function App() {
  const [images, setImages] = useState([]);
  const [width, setWidth] = useState(112);
  const [height, setHeight] = useState(112);

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

  return (
    <div className="App">
      <div className="Header">
        <h1>Resize Me</h1>
      </div>
      <Controls
        width={width}
        height={height}
        setWidth={setWidth}
        setHeight={setHeight}
        insertImages={insertImages}
      />
      <Gallery
        images={images}
        removeImages={removeImage}
        width={width}
        height={height}
      />
    </div>
  );
}

export default App;

