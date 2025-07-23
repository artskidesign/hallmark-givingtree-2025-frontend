import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { ShowAt } from 'react-with-breakpoints';
import { InformationIcon, Community, Personal, CommunityTree, PersonalTree } from '../images/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/users/actions';
import { localStorageKey, eventCategoryNavigation } from '../constants';
import FixedAd from './Ads/FixedAd';
import { shouldDisplayL } from '../infrastructure/freewheel/breakpoints';
import { trackEvent } from '../infrastructure/tracking/GoogleAnalytics';
import RootState from '../infrastructure/redux/RootState';

const selectUserName = (state: RootState) => state.user.name;
const selectModalViewed = (state: RootState) => state.user.hasSeenModal;

const TreeNavigation: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const userName = useSelector(selectUserName);
  const userHasReadInstructions = useSelector(selectModalViewed);

  const onLogoutClick = () => {
    trackClick('Logout');
    try {
      localStorage.removeItem(localStorageKey);
    } catch {}
    dispatch(logout());
    history.push('/signup');
  };

  const trackClick = (label: string) => {
    trackEvent(eventCategoryNavigation, 'Click', label);
  };

  return (
    <>
      {/* <ShowAt breakpoint="mediumAndBelow">
        {location.pathname === '/' && !userHasReadInstructions ? null : (
          <div className="main-nav">
            <Link to="/how-it-works" onClick={() => trackClick('HowItWorks')}>
              <Button
                classes={{
                  root: 'InfoBtn',
                }}
              >
                <InformationIcon />
              </Button>
            </Link>
            <div className="tree-nav">
              <Link to="/" onClick={() => trackClick('CommunityTree')}>
                <div className={`main-nav-link ${location.pathname === '/' ? 'nav-link-active' : ''}`}>
                  <CommunityTree />
                  <p>Community Tree</p>
                </div>
              </Link>
              <Link to="/your-tree" onClick={() => trackClick('YourTree')}>
                <div className={`main-nav-link ${location.pathname === '/your-tree' ? 'nav-link-active' : ''}`}>
                  <PersonalTree />
                  <p>Your Tree</p>
                </div>
              </Link>
            </div>
          </div>
        )}
      </ShowAt> */}
      <ShowAt breakpoint="largeAndAbove">
        <div className="main-nav-ad">
          <div className={`main-nav ${location.pathname === '/' ? 'light-nav' : ''}`}>
            <div></div>
            {/* <div className="tree-nav">
              <Link to="/" onClick={() => trackClick('CommunityTree')}>
                <Button
                  classes={{
                    root: location.pathname === '/' ? 'PrimaryBtn MdBtn' : 'GreyOutlineBtn MdBtn',
                    label: 'BtnLabel',
                  }}
                >
                  <Community />
                  Community Tree
                </Button>
              </Link>
              <Link to="/your-tree" onClick={() => trackClick('YourTree')}>
                <Button
                  classes={{
                    root: location.pathname === '/your-tree' ? 'PrimaryBtn MdBtn' : 'GreyOutlineBtn MdBtn',
                    label: 'BtnLabel',
                  }}
                >
                  <Personal />
                  Your Tree
                </Button>
              </Link>
            </div>
            <div className="logout-link">
              {location.pathname !== '/signup' && userName && (
                <>
                  <p>{userName}</p>
                  <a onClick={onLogoutClick}>Not You?</a>
                </>
              )}
            </div> */}
          </div>
          <FixedAd
            classNames="banner-right"
            shouldDisplayL={shouldDisplayL}
            hideAd={location.pathname === '/' && !userHasReadInstructions}
          />
        </div>
      </ShowAt>
    </>
  );
};

export default TreeNavigation;
