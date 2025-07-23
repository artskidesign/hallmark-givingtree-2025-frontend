import React from 'react';

interface TreeProps {
  className?: string;
}

const Tree: React.FC<TreeProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      fill="none"
      viewBox="0 0 15 23"
      width="15"
      height="23"
    >
      <path
        fill="#C1C1C1"
        fillRule="evenodd"
        d="M6.868 18.82v3.21h1.469v-3.21h6.009l-2.493-4.362h1.24l-2.21-3.76h1.182L9.93 7.23h1.034l-2.03-3.29h.783L7.651.456 5.583 3.94h.785L4.336 7.23h1.036l-2.138 3.467h1.183l-2.211 3.76h1.24L.953 18.82h5.915z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Tree;
