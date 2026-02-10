import { useState, useEffect } from "react";
import { CirclePicker } from "react-color";
import ColorPicker from "../ColorPicker";
import "../../styles/AirPods.css";
import ConversationalAI from "../ConversationalAI/ConversationalAI";
import Info from "../Info/Info";

function AirPods() {
  const [showInfo, setShowInfo] = useState(false);

  const handleInfoClick = () => {
    setShowInfo(!showInfo);
    document.getElementById("info").style.display = showInfo ? "block" : "none";
  };

  return (
    <div className="airpods" id="airpods">
      <div className="colors">
        <button className="info-button" onClick={handleInfoClick}>
          <span className="info-button-text">Info</span>
          <i className="bi bi-info-circle"></i>
        </button>
        <ConversationalAI />
        <a
          href="https://www.apple.com/shop/buy-airpods/airpods-pro-3"
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
            title="AirPods Pro"
            description="Introducing the world’s best in-ear Active Noise Cancellation
                for the most immersive listening experience ever.13 Designed
                with an upgraded acoustic seal, AirPods Pro 3 automatically
                adapt to your environment and preferences. And new
                ultra-low-noise microphones remove even more unwanted sound. So
                you only hear what you want — in an unheard-of audio experience."
            img="/img/airpods_image.jpg"
            onClose={() => setShowInfo(false)}
          />
        </div>
      )}
    </div>
  );
}

export default AirPods;
