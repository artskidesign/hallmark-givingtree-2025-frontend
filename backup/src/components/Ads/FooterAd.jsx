import React, { useEffect } from 'react';
import AdSlot from './AdSlot';
import { withRouter } from "react-router-dom";
import useFreewheel from '../../infrastructure/freewheel/useFreewheel';

const FooterAd = ({ location, shouldDisplay, classNames }) => {
  const freewheelRequest = useFreewheel();
  useEffect(() => {
    if (shouldDisplay) {
      freewheelRequest(location.pathname);
    }
  }, [location, freewheelRequest, shouldDisplay]);
  if (!shouldDisplay) {
    return null;
  }
  return <AdSlot width={300} height={250} slotId="fixed_ad" classNames={classNames} />;
};

export default withRouter(FooterAd);
