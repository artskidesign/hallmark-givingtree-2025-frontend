import React from 'react';

interface LongArrowRightProps {
  className?: string;
}

const LongArrowRight: React.FC<LongArrowRightProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      width="198"
      height="128"
      fill="none"
      viewBox="0 0 198 128"
    >
      <path
        fill="#000"
        d="M195.742 58.003l-47.997-54c-3.09-3.685-9.199-4.014-12.782-.806-3.584 3.208-3.945 9.328-.624 12.806l34.686 39H9a9 9 0 000 18h160.025l-34.686 39c-3.321 3.479-2.872 9.587.712 12.795 3.583 3.208 9.604 2.89 12.694-.795l47.997-54c3.134-4.366 2.884-8.285 0-12z"
      ></path>
    </svg>
  );
};

export default LongArrowRight;
