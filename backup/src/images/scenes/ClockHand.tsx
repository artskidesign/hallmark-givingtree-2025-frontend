import React from 'react';

interface ClockHandProps {
  className?: string;
  style?: object;
}

const ClockHand: React.FC<ClockHandProps> = ({ className, style }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={style}
      fill="none"
      viewBox="0 0 25 4"
      width="25"
      height="4"
    >
      <path
        fill="#424B73"
        fillRule="evenodd"
        d="M24.406 1.804C16.707-.384 8.806-.384.5 1.804c7.9 2.784 16.207 2.784 23.906 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default ClockHand;
