import React from 'react';

interface PersonalTreeProps {
  className?: string;
}

const PersonalTree: React.FC<PersonalTreeProps> = ({ className }) => {
  return (
    <svg
      preserveAspectRatio="xMidYMid meet"
      className={className}
      viewBox="0 0 22 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="32"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.1918 16.2908L19.0438 20.1548C17.5718 19.7868 16.2838 19.4188 15.0878 19.1428L21.5278 27.9747C11.6839 25.2148 9.3839 25.2148 0 27.9747L3.21997 23.5588C8.27991 22.7308 12.5119 19.9708 16.1918 16.2908Z"
        fill="#7C7C7C"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.4558 15.1869C12.3278 18.4989 8.55582 20.9829 4.32387 21.9948L6.34785 19.1429C5.24386 19.4189 3.95587 19.7869 2.48389 20.1549L7.35984 13.3469C6.71584 13.5309 5.97985 13.8069 5.15186 14.0829L7.17584 10.495C9.65981 12.6109 12.4198 14.2669 15.4558 15.1869Z"
        fill="#7C7C7C"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.7633 4.33101C12.6033 7.64297 14.5353 10.8629 16.3752 14.0829C15.5473 13.8069 14.8113 13.6229 14.1673 13.3469C11.8673 12.4269 9.75132 11.0469 7.81934 9.39096L10.7633 4.33101Z"
        fill="#7C7C7C"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.1563 26.5947V31.9306H8.46436V26.5027C10.0283 26.4107 11.5003 26.4107 13.1563 26.5947Z"
        fill="#7C7C7C"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.7634 0.375L11.4074 2.39898H13.4314L11.7754 3.59497L12.4194 5.61895L10.7634 4.33096L9.01541 5.61895L9.6594 3.59497L8.00342 2.39898H10.1194L10.7634 0.375Z"
        fill="#7C7C7C"
      />
    </svg>
  );
};

export default PersonalTree;
