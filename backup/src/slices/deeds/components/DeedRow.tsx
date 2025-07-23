import React, { useState } from 'react';
import Lottie from 'lottie-react';
import Deed from '../types/Deed';
import callApi from '../../../infrastructure/api/CallApi';
import { localStorageShowStarAnimationKey, totalAmountOfDeeds } from '../../../constants';
import { addCompletedDeed, removeCompletedDeed } from '../../completeddeeds/actions';
import { useDispatch } from 'react-redux';
import animatedConfetti from './animatedConfetti.json';
interface DeedRowProps extends Deed {
  userId: string;
  name: string;
  feed: boolean;
  trackEvent: (action: string, label: string) => void;
  completedDeedsTotal: number;
}

const DeedRow: React.FC<DeedRowProps> = ({
  title,
  completed,
  communityCount,
  id,
  userId,
  name,
  feed,
  trackEvent,
  completedDeedsTotal,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(completed);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isAnimated, setAnimated] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const addDeed = e.target.checked;
    setIsChecked(addDeed);
    setIsDisabled(true);
    callApi(`api/app/completedDeed/${addDeed ? '' : 'remove'}deed`, 'POST', { userId, deedId: id, name, feed })
      .then(() => {
        const action = addDeed ? addCompletedDeed(id, name, feed) : removeCompletedDeed(id, name);
        dispatch(action);
      })
      .catch(() => {
        setIsChecked(completed);
      })
      .finally(() => setIsDisabled(false));
    trackEvent(addDeed ? 'Check' : 'Uncheck', id);
    if (addDeed) {
      setAnimated(true);
    }

    if (e.target.checked && completedDeedsTotal === totalAmountOfDeeds - 1) {
      try {
        window.localStorage.setItem(localStorageShowStarAnimationKey, 'true');
      } catch {
        // localStorage not available
      }
    }
  };

  return (
    <label>
      <div className={`deed-list-view-container ${isAnimated ? 'deed-list-view-container-checked' : ''}`}>
        {isAnimated && <Lottie animationData={animatedConfetti} loop={false} onComplete={() => setAnimated(false)} />}
        <div className="deed-list-view">
          <div className="deed-checkbox-container">
            <div className="deed-container">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={onCheckboxChange}
                disabled={isDisabled}
                id={`checkbox-${title}`}
              />
              <div className="deed-checkmark">
                <div />
                <div />
              </div>
            </div>
          </div>
          <div className="deed-description-container">
            <h2>{title}</h2>
            <h6>
              Community Performed: <span className="highlighted">{communityCount}</span>
            </h6>
          </div>
        </div>
        <h6>
          Community Performed: <span className="highlighted">{communityCount}</span>
        </h6>
      </div>
    </label>
  );
};

export default DeedRow;
