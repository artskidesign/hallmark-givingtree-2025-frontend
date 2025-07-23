import React from 'react';

interface CloseProps {
  className?: string;
}

const Close: React.FC<CloseProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      fill="none"
      viewBox="0 0 38 39"
      width="38"
      height="39"
    >
      <path
        fill="#BA0020"
        d="M22.896 19.279l12.189-12.07 2.485-2.486c.355-.355.355-.947 0-1.42L34.967.699c-.474-.355-1.065-.355-1.42 0L18.99 15.374 4.317.698C3.962.344 3.37.344 2.897.7L.293 3.303c-.355.473-.355 1.065 0 1.42l14.674 14.556L.293 33.953c-.355.355-.355.947 0 1.42l2.604 2.603c.473.355 1.065.355 1.42 0L18.99 23.302l12.07 12.19 2.486 2.484c.355.355.946.355 1.42 0l2.603-2.603c.355-.473.355-1.065 0-1.42L22.896 19.279z"
      ></path>
    </svg>
  );
};

export default Close;
