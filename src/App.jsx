import { useState, useEffect, useRef } from "react";
import Experience from "./components/Experience/Experience.js";
import Watch from "./components/Watch/Watch.jsx";
import Iphone from "./components/Iphone/Iphone.jsx";
import AirPods from "./components/AirPods/AirPods.jsx";
import VisionPro from "./components/VisionPro/VisionPro.jsx";
import ConversationalAI from "./components/ConversationalAI/ConversationalAI.jsx";
import Loader from "./components/Loader/Loader.jsx";
import "./styles/App.css";

function App() {
  const [objectColor, setObjectColor] = useState("#1E1C1D");
  const [currentComponent, setCurrentComponent] = useState("watch");
  const [loading, setLoading] = useState(true);
  const experienceRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const canvas = document.querySelector(".canvas");
    const experience = new Experience(canvas);
    experienceRef.current = experience;

    // Simulación de carga: desaparecer loader después de 3s
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000); // ajusta según tus recursos

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (experienceRef.current) {
      experienceRef.current.setObjectColor(objectColor);
    }
  }, [objectColor]);

  return (
    <>
      <Loader visible={loading} />
      <a href="https://www.apple.com/" target="_blank">
        <img className="img" src="/icons/appleLogo.svg" alt="Apple Logo" />
      </a>
      <div className="buttons">
        <button
          className="beforeButton"
          onClick={() => {
            setCurrentComponent((prev) => {
              if (prev === "watch") return "vision-pro";
              if (prev === "vision-pro") return "airpods";
              if (prev === "airpods") return "iphone";
              if (prev === "iphone") return "watch";
              return "watch";
            });
          }}
        >
          <i className="bi bi-caret-left-fill"></i>
        </button>
        <div className="dots">
          <i className="bi bi-dot" id="dot1" style={{ color: "#ffffffff" }}></i>
          <i className="bi bi-dot" id="dot2"></i>
          <i className="bi bi-dot" id="dot3"></i>
          <i className="bi bi-dot" id="dot4"></i>
        </div>
        <button
          className="nextButton"
          onClick={() => {
            setCurrentComponent((prev) => {
              if (prev === "watch") return "iphone";
              if (prev === "iphone") return "airpods";
              if (prev === "airpods") return "vision-pro";
              return "watch";
            });
          }}
        >
          <i className="bi bi-caret-right-fill"></i>
        </button>
      </div>

      {currentComponent === "watch" && <Watch onColorChange={setObjectColor} />}
      {currentComponent === "iphone" && (
        <Iphone onColorChange={setObjectColor} />
      )}
      {currentComponent === "airpods" && (
        <AirPods onColorChange={setObjectColor} />
      )}
      {currentComponent === "vision-pro" && <VisionPro />}
      <canvas className="canvas"></canvas>
    </>
  );
}

export default App;
