import React from 'react';
import JerseyMikesLogo from '../images/Jersey_Mikes.png';
import useLinkTarget from '../infrastructure/isWebView/useLinkTarget';
import { trackEvent } from '../infrastructure/tracking/GoogleAnalytics';
import { eventCategoryNavigation } from '../constants';

const onSponsorLogoClick = () => trackEvent(eventCategoryNavigation, 'Click', 'SponsorLogo');

const SponsorLogo = () => {
  const target = useLinkTarget();
  return (
    <div className="sponsor-logo">
      <p>Presented by</p>
    <a href="https://www.jerseymikes.com/#utm_source=IndieGlobal&utm_medium=Hallmark%20-%20CC&utm_campaign=GivingTree" target={target} onClick={onSponsorLogoClick}>
        <img src={JerseyMikesLogo} alt="Jersey Mikes" />
      </a>
    </div>
  );
};

export default SponsorLogo;
