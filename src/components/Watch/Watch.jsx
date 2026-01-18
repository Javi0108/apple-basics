import { useState, useEffect, useRef } from "react";
import { CirclePicker } from "react-color";
import ColorPicker from "../ColorPicker";
import LiquidGlass from "liquid-glass-react";
import "../../styles/Watch.css";
import ConversationalAI from "../ConversationalAI/ConversationalAI";
import Info from "../Info/Info";

function Watch({ onColorChange }) {
  const containerRef = useRef < HTMLDivElement > null;

  const handleChangeComplete = (color) => {
    onColorChange(color.hex);
  };

  const [showInfo, setShowInfo] = useState(false);

  const handleInfoClick = () => {
    setShowInfo(!showInfo);
    document.getElementById("info").style.display = showInfo ? "block" : "none";
  };

  return (
    <div className="watch" id="watch">
      <div className="colors">
        <ColorPicker
          className="color-picker"
          colors={["#1E1C1D", "#dfd5cbff"]}
          onChangeComplete={handleChangeComplete}
        />
        <button className="info-button" onClick={handleInfoClick}>
          <i className="bi bi-info-circle"></i>
        </button>
        <ConversationalAI className="IA-Conversation" />
      </div>
      {showInfo && (
        <div id="info">
          <Info
            title="Apple Watch Ultra 3"
            description="The Apple Watch Ultra 3 is a powerful evolution, solidifying its
                status as the best overall smartwatch money can buy. The larger,
                brighter display is a significant upgrade, while the addition of
                accessible and varied satellite-powered features provides a
                better safety net than rivals currently offer. Core tracking
                accuracy for GPS and heart rate remains among the industry's
                best, and the battery life sees a welcome (if not revolutionary)
                improvement. While it still lacks the deep training analysis of
                a dedicated sports watch, it masterfully strikes the balance
                between an accomplished sports tracker and a seamless
                smartwatch."
            img="/img/watch_image.jpg"
            onClose={() => setShowInfo(false)}
          />
        </div>
      )}
    </div>
  );
}

export default Watch;
