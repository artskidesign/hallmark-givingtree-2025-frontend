import React, { useRef } from 'react';
import BulbPosition from './BulbPosition';
import GoodDeedPopUpCommunityTree from './GoodDeedPopUpCommunityTree';
import Bulbs from '../../images/trees';
import { communityTreeHeight, communityTreeWidth, communityBulbWidth } from '../../constants';
import { BulbColor } from '../../types';

interface CommunityBulbProps extends BulbPosition {
  tooltipBulbId: string;
  id: string;
  titlePastTense: string;
  communityCount: number;
  name: string;
  color: BulbColor;
  clickedBulbId: string;
  clickedBulb: boolean;
  clickedName: string;
  onBulbClick: (bulbId: string) => void;
}

const CommunityBulb: React.FC<CommunityBulbProps> = ({
  left,
  top,
  titlePastTense,
  id,
  communityCount,
  tooltipBulbId,
  clickedBulbId,
  clickedBulb,
  clickedName,
  name,
  color,
  onBulbClick,
}) => {
  const showTooltip = (clickedBulb && clickedBulbId === id) || (!clickedBulb && tooltipBulbId === id);
  const bulbWidth = `${(communityBulbWidth / communityTreeWidth) * 100}%`;
  const bulbRef = useRef<HTMLImageElement>(null);

  const getBulbHeight = () => {
    return bulbRef.current ? bulbRef.current!.offsetHeight : 0;
  };

  return (
    <>
      <div
        className="bulb"
        style={{
          left: `${(left / communityTreeWidth) * 100}%`,
          top: `${(top / communityTreeHeight) * 100}%`,
          width: bulbWidth,
        }}
      >
        <img
          src={Bulbs[color]}
          alt=""
          className="treebulb"
          onClick={() => onBulbClick(id)}
          ref={bulbRef}
          style={{ cursor: 'pointer' }}
        />
        <div
          className={`community-bulb-light community-bulb-light-${color.toLowerCase()} ${
            showTooltip ? 'community-bulb-light-animated' : ''
          }`}
        />
      </div>
      <GoodDeedPopUpCommunityTree
        communityCount={communityCount}
        title={titlePastTense}
        show={showTooltip}
        name={clickedBulb ? clickedName : name}
        left={left}
        top={top}
        bulbHeight={getBulbHeight()}
      />
    </>
  );
};

export default CommunityBulb;
