import React from 'react';

interface ArrowLeftProps {
  className?: string;
}

const ArrowLeft: React.FC<ArrowLeftProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      fill="none"
      viewBox="0 0 14 14"
      width="14"
      height="14"
    >
      <path
        fill="#BA0020"
        fillRule="evenodd"
        d="M7.703 1.97A.94.94 0 006.433.586L.307 6.199a.946.946 0 00-.303.78.935.935 0 00.311.618l6.216 5.612a.94.94 0 101.26-1.395l-4.407-3.98h9.556a.94.94 0 100-1.88H3.357l4.346-3.983z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default ArrowLeft;
