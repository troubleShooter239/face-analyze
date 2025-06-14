import React from "react";
import "./style.css";

const images = [
  // "https://i.ibb.co/TDq7kFrn/anal-ex1.png",
  "https://i.ibb.co/LhDm7BGf/anal-ex3.png",
  "https://i.ibb.co/k2Cs1L5X/anal-ex2.png",
  "https://i.ibb.co/dwCFRKx1/anal-ex4.png",
];

const ImageMarquee: React.FC = () => {
  return (
    <div className="marquee-container">
      <div className="marquee">
        {[...images, ...images].map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`marquee-${index}`}
            className="marquee-img"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageMarquee;
