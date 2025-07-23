import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdSlot from './AdSlot';
import useFreewheel from '../../infrastructure/freewheel/useFreewheel';

interface FixedAdProps {
  classNames: string;
  shouldDisplayL: boolean;
  hideAd: boolean;
}

const FixedAd: React.FC<FixedAdProps> = ({ classNames, shouldDisplayL, hideAd }) => {
  const freewheelRequest = useFreewheel();
  const location = useLocation();

  useEffect(() => {
    if (shouldDisplayL && !hideAd) {
      freewheelRequest(location.pathname);
    }
    // eslint-disable-next-line
  }, [location, freewheelRequest, shouldDisplayL]);

  if (!shouldDisplayL || hideAd) {
    return null;
  }

  return <AdSlot width={300} height={600} slotId="fixed_ad" classNames={classNames} />;
};

export default FixedAd;
