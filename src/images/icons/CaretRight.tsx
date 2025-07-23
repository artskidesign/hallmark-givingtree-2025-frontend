import React from 'react';

interface CaretRightProps {
  className?: string;
}

const CaretRight: React.FC<CaretRightProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      fill="none"
      viewBox="0 0 9 17"
      width="9"
      height="17"
    >
      <path
        fill="#fff"
        d="M.809.854l-.704.667c-.14.176-.14.458 0 .598L6.47 8.482.105 14.881c-.14.14-.14.422 0 .598l.704.668a.405.405 0 00.597 0L8.79 8.799a.476.476 0 000-.598L1.406.854a.405.405 0 00-.597 0z"
      ></path>
    </svg>
  );
};

export default CaretRight;
