import { useRef, useState } from "react";
import "./DragAndDrop.css";

function DragAndDrop({ handleUploadPNG }) {
  const dropRef = useRef();
  const [dragging, setDragging] = useState(false);

  const handleDragIn = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };

  const handleDragOut = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setDragging(false);
  };

  const handleDrag = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      handleUploadPNG(event.dataTransfer.files);
      event.dataTransfer.clearData();
    }
  };

  return (
    <div
      className="DragAndDrop"
      ref={dropRef}
      onDragEnter={(event) => {
        handleDragIn(event);
      }}
      onDragOver={(event) => {
        handleDrag(event);
      }}
      onDragLeave={(event) => {
        handleDragOut(event);
      }}
      onDrop={(event) => {
        handleDrop(event);
      }}
      style={
        dragging
          ? {
              border: "1px dashed grey",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            }
          : {
              border: "1px solid black",
              backgroundColor: "rgba(255, 255, 255, 1)",
            }
      }
    >
      {dragging ? <h1>Drop PNG</h1> : <h1>Upload PNG</h1>}
    </div>
  );
}

export default DragAndDrop;
