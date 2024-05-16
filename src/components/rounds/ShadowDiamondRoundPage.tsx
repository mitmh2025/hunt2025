import React from "react";
import photoimage from "@/assets/demo-photo.png";

const ShadowDiamondRoundPage = () => {
  return (
    <div>
      <h1>Shadow Diamond investigation</h1>
      <p>TODO: show puzzle list based on props</p>
      <ul></ul>
      <img className="photo" src={photoimage} />
      <p>This image was included via SSR asset usage.</p>
      <div id="shadow-diamond-root" />
    </div>
  );
};

export default ShadowDiamondRoundPage;
