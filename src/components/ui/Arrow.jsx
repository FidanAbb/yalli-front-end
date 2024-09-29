import React from "react";

const Arrow = ({color}) => {
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 7H1M1 7L7 1M1 7L7 13"
        stroke={color ? color : "black"}
        strokeWidth="1.5"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Arrow;


