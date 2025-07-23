import React from 'react';

interface PersonalProps {
  className?: string;
}

const Personal: React.FC<PersonalProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      fill="none"
      viewBox="0 0 12 16"
    >
      <path
        fill="#3E3E3E"
        fillRule="evenodd"
        d="M8.843 8.07l1.446 1.96c-.747-.187-1.4-.374-2.006-.514l3.265 4.478c-4.991-1.4-6.157-1.4-10.915 0l1.632-2.239c2.566-.42 4.712-1.819 6.578-3.685z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#3E3E3E"
        fillRule="evenodd"
        d="M8.47 7.51C6.884 9.19 4.97 10.45 2.826 10.962l1.026-1.446c-.56.14-1.213.326-1.96.513l2.473-3.452c-.327.093-.7.233-1.12.373l1.027-1.819c1.26 1.073 2.658 1.913 4.198 2.38zM6.09 2.006c.933 1.68 1.913 3.312 2.846 4.944-.42-.14-.793-.233-1.12-.373-1.166-.466-2.239-1.166-3.218-2.006L6.09 2.006zM7.304 13.294V16h-2.38v-2.752c.794-.047 1.54-.047 2.38.046z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#3E3E3E"
        fillRule="evenodd"
        d="M6.09 0l.327 1.026h1.027l-.84.607.326 1.026-.84-.653-.885.653.326-1.026-.84-.607h1.073L6.091 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Personal;
