import "../../styles/Info.css";

function Info({ title, description, img, onClose }) {
  return (
    <div className="info-container">
      <h3 className="info-title">
        {title}
        <button className="info-close" onClick={onClose}>
          <i className="bi bi-x-lg"></i>
        </button>
      </h3>
      <div className="info-content">
        <img src={img} alt="Apple AirPods Pro" width={"100%"} />
        <div className="rating">
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <span>5.0</span>
          <span>(1234 reviews)</span>
        </div>
        <p className="info-description">{description}</p>
      </div>
    </div>
  );
}

export default Info;
