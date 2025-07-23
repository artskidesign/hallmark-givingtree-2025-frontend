import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RootState from '../redux/RootState';

interface SecuredRootProps extends RouteProps {
  component: any;
}

const selectUserId = (state: RootState) => state.user.id;

const SecuredRoute: React.FC<SecuredRootProps> = ({ component: Component }) => {
  const userId = useSelector(selectUserId);
  return <Route render={(props) => (userId ? <Component {...props} /> : <Redirect to="/signup" />)} />;
};

export default SecuredRoute;
