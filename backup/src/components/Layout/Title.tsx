import React from 'react';
import { Tree } from '../../images/icons';

const Title: React.FC<{}> = ({ children }) => {
  return (
    <div className="header-text">
      <h1>{children}</h1>
      <div className="header-text-ornament">
        <div className="line" />
        <Tree />
        <div className="line" />
      </div>
    </div>
  );
};

export default Title;
