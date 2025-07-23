import React, { createContext, useContext, useRef } from 'react';

const createAdManager = () => {
  const { networkId, serverUrl, profileId, siteSectionId } = window.config;
  let adManager;
  try {
    window.tv.freewheel.SDK.setLogLevel(window.tv.freewheel.SDK.LOG_LEVEL_QUIET);
    adManager = new window.tv.freewheel.SDK.AdManager();
    adManager.setNetwork(networkId);
    adManager.setServer(serverUrl);
    adManager._context.setProfile(profileId);
    adManager._context.setSiteSection(siteSectionId);
  } catch{}
  return adManager;
};

const FreewheelContext = createContext();

export const FreewheelProvider = ({ children }) => {
  const urlRef = useRef();

  const adManager = createAdManager();
  const { enableFreewheel } = window.config;

  function submitRequest(url) {
    if (enableFreewheel && adManager && urlRef.current !== url) {
      urlRef.current = url;
      // this is to ensure we send request after react re-render
      setTimeout(() => {
        adManager.newContextWithContext(adManager._context);
        adManager._context.submitRequest();
        console.log('submit FW request');
      }, 10);
    }
  }
  const context = {
    submitRequest
  };
  return (
    <FreewheelContext.Provider value={context}>
      {children}
    </FreewheelContext.Provider>
  );
};

export const useFreewheelContext = () => useContext(FreewheelContext);