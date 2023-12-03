import React, { useState } from "react";
//styles
import "../../assets/styles/Flex.scss";
import "../../assets/styles/New.scss";
//accets
import flower from "../../assets/images/flower.webp";
import peaceLogo from "../../assets/images/peaceLogo.png";

const images = Array(36)
  .fill()
  .map((_, i) => `/images/shoes/img${i + 1}.avif`);

function Shoe360View() {
  const [index, setIndex] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    const newIndex = Math.floor(images.length * percent);
    setIndex(newIndex);
  };

  return (
    <div className="new-bg flex_column">
      <div className="sector3 flex_column">
        <img src={flower} alt="flower" />
        <img src={peaceLogo} alt="peacep" />
      </div>
      <div className="sector2"></div>
      <div className="sector1">
        <h1>Nike Air Force 1 Low</h1>
        <p>G-Dragon Peaceminusone Para-Noise (Korea exclusive)</p>
        <h2>₩ 3,000,000</h2>
        <img src={images[index]} alt="Shoe" onMouseMove={handleMouseMove} />
      </div>
    </div>
  );
}

export default Shoe360View;
