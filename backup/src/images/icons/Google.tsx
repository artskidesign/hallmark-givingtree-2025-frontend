import React from 'react';

interface GoogleProps {
  className?: string;
}

const Google: React.FC<GoogleProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      viewBox="0 0 22 21"
      className={className}
      width="22"
      height="21"
    >
      <path
        fill="#4285F4"
        fillRule="evenodd"
        d="M20.736 10.31c0-.71-.065-1.393-.186-2.048h-9.681v3.874h5.532c-.238 1.252-.963 2.312-2.051 3.023v2.512h3.322c1.943-1.743 3.064-4.31 3.064-7.36z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#34A853"
        fillRule="evenodd"
        d="M10.869 20.098c2.775 0 5.102-.897 6.803-2.427L14.35 15.16c-.92.6-2.098.956-3.481.956-2.677 0-4.943-1.762-5.751-4.13H1.684v2.595c1.69 3.274 5.167 5.518 9.185 5.518z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#FBBC05"
        fillRule="evenodd"
        d="M5.118 11.986a5.88 5.88 0 01-.323-1.903c0-.66.117-1.302.323-1.903V5.585H1.684a9.803 9.803 0 000 8.995l3.434-2.594z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#EA4335"
        fillRule="evenodd"
        d="M10.869 4.05c1.509 0 2.864.506 3.93 1.499l2.947-2.873C15.966 1.06 13.64.068 10.87.068c-4.018 0-7.494 2.244-9.185 5.517L5.118 8.18c.808-2.367 3.074-4.13 5.75-4.13z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Google;
