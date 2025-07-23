import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { shouldDisplayL } from '../../infrastructure/freewheel/breakpoints';
import AdSlot from './AdSlot';
import useFreewheel from '../../infrastructure/freewheel/useFreewheel';

const AnimatedBanner = () => {
  const urlRef = useRef<string>('');
  const bannerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const [showBannerAd, setShowBannerAd] = useState<boolean>(true);
  const [startFadeOut, setStartFadeout] = useState<boolean>(false);
  const freewheelRequest = useFreewheel();

  useEffect(() => {
    if (urlRef.current !== location.pathname) {
      setShowBannerAd(true);
      setStartFadeout(false);
      urlRef.current = location.pathname;
      freewheelRequest(location.pathname);
      bannerTimer.current = setTimeout(() => {
        setShowBannerAd(false);
      }, 9900);
      animationTimer.current = setTimeout(() => {
        setStartFadeout(true);
      }, 9000);
    }

    return () => {
      if (bannerTimer.current){
        clearTimeout(bannerTimer.current);
      }
      if (animationTimer.current){
        clearTimeout(animationTimer.current);
      }
    } 
  }, [freewheelRequest, location.pathname]);

  return showBannerAd ? (
    <AdSlot
      width={shouldDisplayL ? 728 : 320}
      height={shouldDisplayL ? 90 : 100}
      slotId="banner_ad"
      classNames={`banner-bottom ${startFadeOut ? 'fadeOutDown' : ''}`}
    />
  ) : null;
};

export default AnimatedBanner;
