import React from "react";
import { createRoot } from "react-dom/client";
import { StlViewer } from "react-stl-viewer";

const STLDisplay = ({
  url,
  aspectRatio,
  latitude = 0,
  longitude = -Math.PI / 8,
  distance = 2,
  hideInstructions = false,
}: {
  url: string;
  aspectRatio?: string;
  latitude?: number;
  longitude?: number;
  distance?: number;
  hideInstructions?: boolean;
}) => {
  return (
    <>
      {!hideInstructions && (
        <p>
          (Left click to orbit, right click to pan, scroll or middle click to
          zoom)
        </p>
      )}
      <StlViewer
        url={url}
        style={{ aspectRatio }}
        orbitControls
        shadows
        cameraProps={{
          initialPosition: {
            latitude,
            longitude,
            distance,
          },
        }}
      />
    </>
  );
};

const elems = document.querySelectorAll(".radio-stl-render");
if (elems.length === 0) {
  console.error("No elements found with class 'radio-stl-render'");
} else {
  [...elems]
    .filter((elem): elem is HTMLElement => elem instanceof HTMLElement)
    .forEach((elem) => {
      const url = elem.dataset.url;
      if (!url) {
        console.error("No URL found in data-url attribute", elem);
        return;
      }

      const { aspectRatio, latitude, longitude, distance, hideInstructions } =
        elem.dataset;
      const opts = {
        ...(aspectRatio ? { aspectRatio } : {}),
        ...(latitude ? { latitude: parseFloat(latitude) } : {}),
        ...(longitude ? { longitude: parseFloat(longitude) } : {}),
        ...(distance ? { distance: parseFloat(distance) } : {}),
        ...(hideInstructions
          ? { hideInstructions: hideInstructions === "true" }
          : {}),
      };

      const root = createRoot(elem);
      root.render(<STLDisplay url={url} aspectRatio={aspectRatio} {...opts} />);
    });
}
