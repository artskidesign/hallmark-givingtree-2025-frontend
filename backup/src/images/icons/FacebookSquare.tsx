import React from 'react';

interface FacebookSquareProps {
  className?: string;
}

const FacebookSquare: React.FC<FacebookSquareProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      width="24"
      height="24"
    >
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M22.247.351H1.531C.821.351.246.927.246 1.637v20.716c0 .71.575 1.285 1.285 1.285h11.153V14.62H9.65v-3.514h3.035V8.514c0-3.008 1.837-4.646 4.52-4.646 1.285 0 2.39.096 2.712.139V7.15l-1.86.001c-1.46 0-1.743.693-1.743 1.71v2.245h3.48l-.453 3.514h-3.027v9.018h5.934c.71 0 1.286-.576 1.286-1.285V1.637c0-.71-.576-1.286-1.286-1.286z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default FacebookSquare;
