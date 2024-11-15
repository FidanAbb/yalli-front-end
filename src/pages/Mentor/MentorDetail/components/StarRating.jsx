import React, { useState } from "react";

// StarRating komponenti
const StarRating = ({ totalStars = 5, onRatingChange }) => {
  const [rating, setRating] = useState(0); // Seçilmiş reytinq
  const [hoverRating, setHoverRating] = useState(0); // Hover zamanı müvəqqəti reytinq

  // Reytinqi dəyişmək üçün funksiya
  const handleClick = (starValue) => {
    setRating(starValue);
    if (onRatingChange) {
      onRatingChange(starValue);
    }
  };

  // Hover funksiyaları
  const handleMouseEnter = (starValue) => setHoverRating(starValue);
  const handleMouseLeave = () => setHoverRating(0);

  return (
    <div className="comment-stars">
    <div className="comment-stars-con" style={{ display: "flex" }}>
      {Array.from({ length: totalStars }, (_, index) => {
        const starValue = index + 1; // Hər bir ulduzun dəyərini təyin edir (1, 2, 3, ...)

        return (
          <p
            key={starValue}
            onClick={() => handleClick(starValue)} // Klik zamanı reytinqi təyin edir
            onMouseEnter={() => handleMouseEnter(starValue)} // Hover reytinqini təyin edir
            onMouseLeave={handleMouseLeave} // Hover bitdikdə sıfırlayır
            style={{
              fontSize: "40px",
              color: starValue <= (hoverRating || rating) ? "gold" : "gray", // Hover və ya seçilmiş reytinqə əsasən rəngi təyin edir
              cursor: "pointer",
              marginRight: "5px"
            }}
          >
            ★
          </p>
        );
      })}
    </div>
  </div>
  );
};

// Star komponenti - hər bir ulduzu təsvir edir


export default StarRating;
