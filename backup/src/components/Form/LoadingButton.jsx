import React from "react";
import { isIE } from "react-device-detect";

const LoadingButton = ({ isLoading, buttonContent }) => {
  return (
    <>
      {/* {isLoading && ( */}
      <div
        className={`spinner ${isIE ? "spinner-explorer" : ""}`}
        style={{ opacity: isLoading ? 1 : 0 }}
      >
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
      {/* )} */}
      <div className="btn-text" style={{ opacity: isLoading ? 0 : 1 }}>
        {buttonContent}
      </div>
    </>
  );
};

export default LoadingButton;
