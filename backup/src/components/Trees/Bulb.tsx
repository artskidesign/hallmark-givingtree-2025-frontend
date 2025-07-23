import React, { useRef } from 'react';
import BulbPosition from './BulbPosition';
import Deed from '../../slices/deeds/types/Deed';
import GoodDeedPopUpYourTree from './GoodDeedPopUpYourTree';
import BulbImage from '../../images/trees/user-tree-bulb.png';
import { personalTreeHeight, personalTreeWidth } from '../../constants';
interface BulbProps extends BulbPosition, Deed {
  onBulbClick: (bulbId: string) => void;
  clickedBulbId: string;
}

const Bulb: React.FC<BulbProps> = ({ left, top, titlePastTense, id, communityCount, onBulbClick, clickedBulbId }) => {
  const showTooltip = clickedBulbId === id;
  const bulbWidth = `${(58.07 / personalTreeWidth) * 100}%`;
  const bulbRef = useRef<HTMLImageElement>(null);

  const getBulbHeight = () => {
    return bulbRef.current ? bulbRef.current!.offsetHeight : 0;
  };

  return (
    <>
      <div
        className="bulb"
        style={{
          left: `${(left / personalTreeWidth) * 100}%`,
          top: `${(top / personalTreeHeight) * 100}%`,
          width: bulbWidth,
        }}
      >
        <img
          src={BulbImage}
          alt=""
          className="treebulb"
          onClick={() => onBulbClick(id)}
          ref={bulbRef}
          style={{ cursor: 'pointer' }}
        />
        <div className={`bulb-light ${showTooltip ? 'bulb-light-animated' : ''}`} />
      </div>
      <GoodDeedPopUpYourTree
        communityCount={communityCount}
        title={titlePastTense}
        show={showTooltip}
        left={left}
        top={top}
        bulbHeight={getBulbHeight()}
      />
    </>
  );
};

export default Bulb;
