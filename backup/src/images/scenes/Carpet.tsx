import React from 'react';

interface CarpetProps {
  className?: string;
  style?: object;
}

const Carpet: React.FC<CarpetProps> = ({ className, style }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      fill="none"
      viewBox="0 0 1920 275"
      className={className}
      style={style}
      width="1920"
      height="275"
    >
      <g clipPath="url(#clip0)">
        <path fill="#fff" d="M0 0H1920V275H0z"></path>
        <path fill="url(#paint0_linear)" d="M-17 -891H1938V0.3170000000000073H-17z" opacity="0.5"></path>
        <path fill="#DB0032" d="M-17 0.317H1938V275H-17z"></path>
        <mask id="mask0" width="1955" height="275" x="-17" y="0" maskUnits="userSpaceOnUse">
          <path fill="#625D53" d="M-17 0.317H1938V275H-17z"></path>
        </mask>
        <g mask="url(#mask0)">
          <path
            fill="url(#paint1_linear)"
            d="M411.848 272.439h32.11l96.329-368.107h-25.92L411.848 272.44zm401.177 0h32.11l22.051-368.107h-25.92L813.025 272.44zm-133.854 0h32.109l46.81-368.107h-25.919l-53 368.107zM405.658-95.668L278.381 272.44h32.109L431.965-95.668h-26.307zM545.703 272.44h32.109l71.57-368.107h-25.92L545.703 272.44zM79.146-95.668L1 46.713v52.959L105.066-96.102h-25.92v.434zm108.709 0L11.058 272.44h32.11L213.775-95.668h-25.92zm108.708 0L144.526 272.44h32.11L322.87-95.668h-26.307zm1549.387 0h-25.92L1921 94.03V41.07l-75.05-136.738zm-896.362 0l-3.095 368.107h32.109l-3.095-368.107h-25.919zm652.642 0l146.23 368.107h32.11L1628.53-95.668h-26.3zm-217.42 0l96.33 368.107h32.11L1410.73-95.668h-25.92zm326.12 0l171 368.107h32.11L1736.85-95.668h-25.92zm-217.41 0l121.47 368.107h32.11L1519.82-95.668h-26.3zm-435.22 0l22.05 368.107h32.11L1084.6-95.668h-26.3zm217.8 0l71.57 368.107h32.11l-77.76-368.107h-25.92zm-109.1 0l46.81 368.107h32.11l-52.61-368.107H1167z"
          ></path>
        </g>
      </g>
      <defs>
        <linearGradient id="paint0_linear" x1="960.5" x2="960.5" y1="-891" y2="0.317" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff"></stop>
          <stop offset="0.271" stopColor="#ECE7DF"></stop>
          <stop offset="1" stopColor="#DFD7C8"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="960.979"
          x2="960.979"
          y1="25.137"
          y2="296.836"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C7001E"></stop>
          <stop offset="0.995" stopColor="#EF1446"></stop>
        </linearGradient>
        <clipPath id="clip0">
          <path fill="#fff" d="M0 0H1920V275H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
};

export default Carpet;
