import { useState, useEffect } from "react";
import { CirclePicker } from "react-color";
import ColorPicker from "../ColorPicker";
import "../../styles/Iphone.css";
import ConversationalAI from "../ConversationalAI/ConversationalAI";
import Info from "../Info/Info";

function Iphone({ onColorChange }) {
  const handleChangeComplete = (color) => {
    onColorChange(color.hex);
  };

  const [showInfo, setShowInfo] = useState(false);

  const handleInfoClick = () => {
    setShowInfo(!showInfo);
    document.getElementById("info").style.display = showInfo ? "block" : "none";
  };

  return (
    <div className="iphone" id="iphone">
      <div className="colors">
        <ColorPicker
          className="color-picker"
          colors={["#49547E", "#F67E36", "#E7E7E7"]}
          onChangeComplete={handleChangeComplete}
        />

        <button className="info-button" onClick={handleInfoClick}>
          <span className="info-button-text">Info</span>
          <i className="bi bi-info-circle"></i>
        </button>
        <ConversationalAI />
        <a
          href="https://www.apple.com/shop/buy-iphone/iphone-17-pro"
          className="buy-button"
          title="Buy it!"
          target="_blank"
        >
          <span className="buy-button-text">Buy it!</span>
          <i className="bi bi-bag"></i>
        </a>
      </div>
      {showInfo && (
        <div id="info">
          <Info
            title="Iphone 17 Pro"
            description="Introducing iPhone 17 Pro and iPhone 17 Pro Max, designed from
                the inside out to be the most powerful iPhone models ever made.
                At the core of the new design is a heat-forged aluminum unibody
                enclosure that maximizes performance, battery capacity, and
                durability."
            img="/img/iphone_image.jpg"
            onClose={() => setShowInfo(false)}
          />
        </div>
      )}
    </div>
  );
}

export default Iphone;
