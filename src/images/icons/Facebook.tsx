import React from "react";

interface FacebookProps {
  className?: string;
}

const Facebook: React.FC<FacebookProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      viewBox="0 0 9 16"
      className={className}
      width="9"
      height="16"
    >
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M5.615 15.826V8h2.137l.284-2.697h-2.42l.003-1.35c0-.704.066-1.08 1.065-1.08H8.02V.173H5.883c-2.567 0-3.471 1.308-3.471 3.509v1.62h-1.6v2.696h1.6v7.827h3.203z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Facebook;
