import { useState, useEffect, useRef } from "react";
import ConversationalAI from "../ConversationalAI/ConversationalAI";
import Info from "../Info/Info";

function VisionPro() {
  const [showInfo, setShowInfo] = useState(false);

  const handleInfoClick = () => {
    setShowInfo(!showInfo);
    document.getElementById("info").style.display = showInfo ? "block" : "none";
  };

  return (
    <div className="vision-pro" id="vision-pro">
      <div className="colors">
        <button
          className="info-button"
          title="Information"
          onClick={handleInfoClick}
        >
          <span className="info-button-text">Info</span>
          <i className="bi bi-info-circle"></i>
        </button>
        <ConversationalAI className="IA-Conversation" />
      </div>
      {showInfo && (
        <div id="info">
          <Info
            title="Apple Vision Pro"
            description="The Apple Vision Pro is a revolutionary spatial computer that seamlessly blends digital content with the physical world. It features an immersive micro-OLED display system with over 23 million pixels, providing stunning clarity and vibrant colors. Powered by the M2 and R1 chips, it delivers lag-free performance for demanding applications and entertainment. The intuitive eye and hand-tracking interface allows you to navigate apps, watch movies, and collaborate with others in a completely new way."
            img="/img/vision_image.jpg"
            onClose={() => setShowInfo(false)}
          />
        </div>
      )}
    </div>
  );
}

export default VisionPro;
