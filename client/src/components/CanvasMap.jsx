import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_TOKEN_KEY;

const CanvasMap = () => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v9",
      center: [78.9629, 20.5937],
      zoom: 3,
      preserveDrawingBuffer: true,
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  const downloadImage = () => {
    const canvas = mapRef.current.getCanvas();
    const dataURL = canvas.toDataURL();
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = dataURL;
    link.click();
  };

  return (
    <div className="canvas-container">
      <div ref={mapContainerRef} id="map" style={{ width: 400, height: 400 }} />
      <button className="button" onClick={downloadImage}>Export</button>
    </div>
  );
};

export default CanvasMap;
