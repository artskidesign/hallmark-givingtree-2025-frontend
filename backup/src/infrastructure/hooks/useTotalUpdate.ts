import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import callApi from '../api/CallApi';
import { updateTotal } from '../../slices/deeds/actions';

const useTotalUpdate: (intervalInSeconds: number) => void = (intervalInSeconds) => {
  const dispatch = useDispatch();

  const getAndUpdateTotal = () => {
    callApi<number>('api/app/deed/latestCount', 'GET').then(({ data: updatedTotal }) => {
      dispatch(updateTotal(updatedTotal));
    });
  };

  useEffect(() => {
    const totalInterval = setInterval(getAndUpdateTotal, intervalInSeconds * 1000);
    return () => clearInterval(totalInterval);
    // eslint-disable-next-line
  }, []);
};

export default useTotalUpdate;
