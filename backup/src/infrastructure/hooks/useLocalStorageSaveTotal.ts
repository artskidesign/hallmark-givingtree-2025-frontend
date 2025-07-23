import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import RootState from '../redux/RootState';
import { localStorageSavedTotalKey } from '../../constants';

const selectTotal = (state: RootState) => state.deed.communityCount;

const useLocalStorageSaveTotal: () => void = () => {
  const communityCount = useSelector(selectTotal);
  const saveToLocalStorage = () => {
    try {
      localStorage.setItem(localStorageSavedTotalKey, communityCount.toString());
    } catch {}
  };

  useEffect(saveToLocalStorage, [communityCount]);
};

export default useLocalStorageSaveTotal;
