import React from 'react';
import { numberWithCommas } from '../../helpers';
import { personalTreeHeight, personalTreeWidth, personalBulbWidth } from '../../constants';
import useWindowDimensions from '../../infrastructure/hooks/useWindowDimensions';

interface GoodDeedPopUpYourTreeProps {
  title: string;
  communityCount: number;
  show: boolean;
  left: number;
  top: number;
  bulbHeight: number;
}

const GoodDeedPopUpYourTree: React.FC<GoodDeedPopUpYourTreeProps> = ({
  title,
  communityCount,
  show,
  left,
  top,
  bulbHeight,
}) => {
  const { windowWidth } = useWindowDimensions();

  const getTooltipClassName = () => {
    if (windowWidth < 992) {
      if (top < personalTreeHeight / 2) {
        return 'top';
      }
      return 'bottom';
    }
    if (left < personalTreeWidth / 2 || top < 300) {
      return 'left';
    }
    return 'right';
  };

  const getArrowPosition = () => {
    if (windowWidth < 992) {
      if (top < personalTreeHeight / 2) {
        return { left: `${(left / personalTreeWidth) * 100}%` };
      }
      return { left: `${(left / personalTreeWidth) * 100}%` };
    }
  };

  const getTooltipPosition = () => {
    if (windowWidth < 992) {
      if (top < personalTreeHeight / 2) {
        return {
          left: 0,
          top: `${(top / personalTreeHeight) * 100}%`,
          transform: `translateY(${bulbHeight}px)`,
        };
      }
      return {
        left: 0,
        top: `${(top / personalTreeHeight) * 100}%`,
      };
    }
    if (left < personalTreeWidth / 2 || top < 300) {
      return {
        left: `${((left + personalBulbWidth) / personalTreeWidth) * 100}%`,
        top: `${((top + bulbHeight / 2) / personalTreeHeight) * 100}%`,
      };
    }
    return {
      left: `${(left / personalTreeWidth) * 100}%`,
      top: `${((top + bulbHeight / 2) / personalTreeHeight) * 100}%`,
    };
  };

  return (
    <>
      <div
        className={`deed-with-tooltip deed-with-tooltip-${getTooltipClassName()} ${
          show ? 'deed-with-tooltip-visible' : 'deed-with-tooltip-hidden'
        }`}
        style={getTooltipPosition()}
      >
        <div className={`deed-tooltip-arrow deed-tooltip-arrow-${getTooltipClassName()}`} style={getArrowPosition()} />
        <div className="deed-tooltip-shadow" />

        <div className="deed-tooltip-container community-tooltip-container">
          <>
            <h6>
              You and <span className="highlighted">{numberWithCommas(communityCount)}</span> others
            </h6>
            <h5>{title}</h5>
          </>
        </div>
      </div>
    </>
  );
};

export default GoodDeedPopUpYourTree;
