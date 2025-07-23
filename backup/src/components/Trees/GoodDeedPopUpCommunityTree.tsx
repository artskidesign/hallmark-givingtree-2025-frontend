import React, { useState, useEffect } from 'react';
import { numberWithCommas } from '../../helpers';
import { communityTreeHeight, communityTreeWidth, communityBulbWidth } from '../../constants';
import useWindowDimensions from '../../infrastructure/hooks/useWindowDimensions';

interface GoodDeedPopUpCommunityTreeProps {
  title: string;
  name: string;
  communityCount: number;
  show: boolean;
  left: number;
  top: number;
  bulbHeight: number;
}

const GoodDeedPopUpCommunityTree: React.FC<GoodDeedPopUpCommunityTreeProps> = ({
  title,
  communityCount,
  show,
  name,
  left,
  top,
  bulbHeight,
}) => {
  const [popUpName, setPopUpName] = useState<string>('');

  useEffect(() => {
    if (show) {
      setPopUpName(name);
    }
    // eslint-disable-next-line
  }, [show]);

  const { windowWidth } = useWindowDimensions();

  const getTooltipClassName = () => {
    if (windowWidth < 992) {
      if (top < communityTreeHeight / 2) {
        return 'top';
      }
      return 'bottom';
    }
    if (left < communityTreeWidth / 2 || top < 300) {
      return 'left';
    }
    return 'right';
  };

  const getArrowPosition = () => {
    if (windowWidth < 992) {
      if (top < communityTreeHeight / 2) {
        return { left: `${(left / communityTreeWidth) * 100}%` };
      }
      return { left: `${(left / communityTreeWidth) * 100}%` };
    }
  };

  const getTooltipPosition = () => {
    if (windowWidth < 992) {
      if (top < communityTreeHeight / 2) {
        return {
          left: 0,
          top: `${(top / communityTreeHeight) * 100}%`,
          transform: `translateY(${bulbHeight}px)`,
        };
      }
      return {
        left: 0,
        top: `${(top / communityTreeHeight) * 100}%`,
        transform: `translateY(-100%)`,
      };
    }
    if (left < communityTreeWidth / 2 || top < 300) {
      return {
        left: `${((left + communityBulbWidth) / communityTreeWidth) * 100}%`,
        top: `${((top + bulbHeight / 2) / communityTreeHeight) * 100}%`,
      };
    }
    return {
      left: `${(left / communityTreeWidth) * 100}%`,
      top: `${((top + bulbHeight / 2) / communityTreeHeight) * 100}%`,
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
              {popUpName} and <span className="highlighted">{numberWithCommas(communityCount)}</span> others
            </h6>
            <h5>{title}</h5>
          </>
        </div>
      </div>
    </>
  );
};

export default GoodDeedPopUpCommunityTree;
