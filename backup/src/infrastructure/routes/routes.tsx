import React, { ReactElement } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { isIE } from 'react-device-detect';
import CommunityTreePage from '../../components/CommunityTreePage';
import YourTreePage from '../../components/YourTreePage';
import FormPage from '../../components/FormPage';
import DeedsPage from '../../components/DeedsPage';
import HowItWorksPage from '../../components/HowItWorksPage';
import SecuredRoute from './SecuredRoute';
import CloseWindow from './CloseWindow'
import GenericRoute from './NotFound404';
import posed, { PoseGroup } from 'react-pose';
import useScrollToTop from '../hooks/useScrollToTop';

interface PageTransitionProps {
  location: any;
  children: ReactElement;
}

const TransitionDiv = posed.div({
  enter: { opacity: 1, delay: 0 },
  exit: { opacity: 0 },
});

const PageTransitions: (props: PageTransitionProps) => ReactElement = ({ children, location }) => {
  return isIE ? (
    children
  ) : (
    <PoseGroup>
      <TransitionDiv key={location.pathname} style={{ position: 'relative' }}>
        {children}
      </TransitionDiv>
    </PoseGroup>
  );
};

const Routes = () => {
  const location = useLocation();
  useScrollToTop(location.pathname);  
  return (
    <PageTransitions location={location}>
      <Switch location={location}>
        <Route exact path="/" component={CommunityTreePage} key="community" />
        <SecuredRoute path="/your-tree" component={YourTreePage} key="mytree" />
        {/* <Route path="/signup" component={FormPage} key="signup" /> */}
        <SecuredRoute path="/deeds" component={DeedsPage} key="deeds" />
        <Route path="/how-it-works" component={HowItWorksPage} key="howitworks" />
        {/* <Route path="/rules" component={Rules} key="rules" /> */}
        <Route path="/closewindow" component={CloseWindow} key="closewindow" />
        <Route path="*" component={GenericRoute} key="genericroute" />
      </Switch>
    </PageTransitions>
  );
};

export default Routes;
