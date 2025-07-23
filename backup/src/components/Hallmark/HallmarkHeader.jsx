import React, { useState } from 'react';
import HallmarkChannelLogo from '../../images/HallmarkChannelLogo';
import withConfig from '../../infrastructure/config/withConfig';
import { CSSTransition } from 'react-transition-group';
import { isIE } from 'react-device-detect';
import { compose } from 'recompose';
import { useSelector } from 'react-redux';

const HallmarkHeader = ({ config: { navBarColor, navBarLink, navBarFranchise } }) => {
  const [navOpen, setNavOpen] = useState(false);

  const isWebView = useSelector(state => state.isWebView.webView); 
  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <header className="PageHeader">
      <div className="PageHeader-container" style={{ backgroundColor: navBarColor }}>
        <CSSTransition in={navOpen} timeout={200} classNames="PageHeader-burger" className="PageHeader-burger">
          <div onMouseDown={toggleNav}>
            <span className="PageHeader-burger-bar"></span>
            <span className="PageHeader-burger-bar"></span>
            <span className="PageHeader-burger-bar"></span>
          </div>
        </CSSTransition>
        <div className="PageHeader-logo">
          <a
            href="https://www.hallmarkchannel.com"
            aria-label="logo"
            className={`${isIE ? 'explorer-logo' : ''}`}
            target={isWebView ? '' : '_blank'}
          >
            <HallmarkChannelLogo />
          </a>
        </div>
        <nav className="PageHeader-navigation-top">
          <ul className="PageHeader-navigation-items">
            <li className="PageHeader-navigation-items-item ">
              <a
                href="https://www.hallmarkchannel.com/schedule"
                aria-label="PageHeader-container"
                target={isWebView ? '' : '_blank'}
              >
                Schedule
              </a>
            </li>
            <li className="PageHeader-navigation-items-item ">
              <a
                href="https://www.hallmarkchannel.com/movies"
                aria-label="PageHeader-container"
                target={isWebView ? '' : '_blank'}
              >
                Movies
              </a>
            </li>
            <li className="PageHeader-navigation-items-item ">
              <a href={navBarLink} aria-label="PageHeader-container" target={isWebView ? '' : '_blank'}>
                {navBarFranchise}
              </a>
            </li>
            <li className="PageHeader-navigation-items-item ">
              <a
                href="https://www.hallmarkchannel.com/home-and-family"
                aria-label="PageHeader-container"
                target={isWebView ? '' : '_blank'}
              >
                Home &amp; Family
              </a>
            </li>
            <li className="PageHeader-navigation-items-item ">
              <a
                href="http://www.hallmarkchanneleverywhere.com/hclive.html"
                target={isWebView ? '' : '_blank'}
                rel="noopener noreferrer"
                aria-label="PageHeader-container"
              >
                Watch Live
              </a>
            </li>
          </ul>
        </nav>
        <div className="PageHeader-search">
          <div className="PageHeader-channel">
            <a
              href="https://www.hallmarkchannel.com/channel-locator"
              aria-label="PageHeader-channel"
              target={isWebView ? '' : '_blank'}
            >
              Channel Locator
            </a>
          </div>
        </div>
      </div>
      <CSSTransition
        in={navOpen}
        timeout={200}
        classNames="PageHeader-navigation"
        className="PageHeader-navigation"
        style={{ backgroundColor: navBarColor }}
      >
        <div>
          <ul className="PageHeader-navigation-items">
            <li className="PageHeader-navigation-items-item">
              <a
                href="https://www.hallmarkchannel.com/schedule"
                target={isWebView ? '' : '_blank'}
                rel="noopener noreferrer"
                aria-label="axe-fix"
              >
                Schedule
              </a>
            </li>

            <li className="PageHeader-navigation-items-item">
              <a
                href="https://www.hallmarkchannel.com/movies"
                target={isWebView ? '' : '_blank'}
                rel="noopener noreferrer"
                aria-label="axe-fix"
              >
                Movies
              </a>
            </li>
            <li className="PageHeader-navigation-items-item">
              <a
                href={navBarLink}
                target={isWebView ? '' : '_blank'}
                rel="noopener noreferrer"
                aria-label="PageHeader-container"
              >
                {navBarFranchise}
              </a>
            </li>
            <li className="PageHeader-navigation-items-item">
              <a
                href="https://www.hallmarkchannel.com/home-and-family"
                target={isWebView ? '' : '_blank'}
                rel="noopener noreferrer"
                aria-label="axe-fix"
              >
                Home &amp; Family
              </a>
            </li>
            <li className="PageHeader-navigation-items-item">
              <a
                href="http://www.hallmarkchanneleverywhere.com/hclive.html"
                target={isWebView ? '' : '_blank'}
                rel="noopener noreferrer"
                aria-label="axe-fix"
              >
                Watch Live
              </a>
            </li>
            <li className="PageHeader-navigation-items-item">
              <a
                href="https://www.hallmarkchannel.com/channel-locator"
                target={isWebView ? '' : '_blank'}
                rel="noopener noreferrer"
                aria-label="axe-fix"
              >
                Channel Locator
              </a>
            </li>
          </ul>
        </div>
      </CSSTransition>
    </header>
  );
};
const enhance = compose(withConfig);

export default enhance(HallmarkHeader);
