import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { HorizontalLogo, VerticalLogo } from '../images/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/users/actions';
import SponsorLogo from './SponsorLogo';
import { localStorageKey, eventCategoryNavigation } from '../constants';
import { trackEvent } from '../infrastructure/tracking/GoogleAnalytics';

const selectUserName = (state) => state.user.name;
const selectModalViewed = (state) => state.user.hasSeenModal;

const trackClick = (label) => {
  trackEvent(eventCategoryNavigation, 'Click', label);
};

const Header = () => {
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

  return (
    <div className={`header ${location.pathname === '/' && !userHasReadInstructions ? 'header-landing' : ''}`}>
      <Link to="/" onClick={() => trackClick('HeaderImage')}>
        <VerticalLogo white />
        <HorizontalLogo white />
      </Link>
      <div className="sponsor-logout">
        <SponsorLogo />
        {/* <div className="logout-link">
          {location.pathname !== '/signup' && userName && (
            <>
              <p>{userName}.</p>
              <a onClick={onLogoutClick}>Not You?</a>
            </>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Header;
