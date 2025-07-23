import React from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import RootState from '../../infrastructure/redux/RootState';
import { useSelector } from 'react-redux';

const selectModalViewed = (state: RootState) => state.user.hasSeenModal;

const PageBackground: React.FC<RouteComponentProps> = ({ location, children }) => {
  const userHasReadInstructions = useSelector(selectModalViewed);
  
  return (
    <div
      id="page-container"
      className={`${location.pathname === '/' ? 'community-background' : ''} ${
        !userHasReadInstructions ? 'community-background-game-info' : ''
      } ${location.pathname === '/your-tree' ? 'mytree-background' : ''}`}
    >
      {children}
    </div>
  );
};

export default withRouter(PageBackground);
