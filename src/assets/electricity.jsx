import React from "react";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="31"
      height="36"
      fill="none"
      viewBox="0 0 31 36"
    >
      <g filter="url(#filter0_d)">
        <path
          fill="#000"
          fillOpacity="0.54"
          d="M9 3v13.75h3.75V28l8.75-15h-5l3.75-10H9z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d"
          width="38.5"
          height="39"
          x="-4"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="4"></feOffset>
          <feGaussianBlur stdDeviation="2"></feGaussianBlur>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}

export default Icon;
