import React from 'react';

interface HeartProps {
  className?: string;
  style?: object;
  dark?: boolean;
}

const Heart: React.FC<HeartProps> = ({ className, style, dark }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      viewBox="0 0 40 48"
      className={className}
      style={style}
      width="40"
      height="48"
    >
      <path
        fill={dark ? '#B3000A' : '#DB0032'}
        d="M19.933 8.498c7.343-14.684 20.323-8.522 19.93 4.72-.394 13.768-14.423 28.846-19.93 34.09C14.427 42.065.397 26.987.003 13.218-.257-.023 12.723-6.185 19.934 8.499z"
      ></path>
    </svg>
  );
};

export default Heart;
