import { useEffect, useState } from "react";
import { SpinnerDotted } from "spinners-react";
import "../../styles/Loader.css";

export default function Loader({ visible }) {
  const [show, setShow] = useState(visible); // controla render
  const [fade, setFade] = useState(visible); // controla clase CSS

  // Maneja fade-out y ocultar loader
  useEffect(() => {
    if (visible) {
      setShow(true);
      setFade(true);
    } else {
      setFade(false); // empieza fade-out
      const timeout = setTimeout(() => setShow(false), 600); // duración fade
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  if (!show) return null;

  return (
    <div className={`loader ${fade ? "loader-visible" : "loader-hidden"}`}>
      <div className="loader-content">
        <SpinnerDotted
          size={70}
          thickness={180}
          speed={65}
          color="rgba(255, 255, 255, 1)"
        />
        <p className="progress-text"></p>
      </div>
    </div>
  );
}
