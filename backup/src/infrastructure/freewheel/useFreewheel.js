import { useRef } from 'react';
import { useFreewheelContext } from './provider';

const useFreewheel = () => {
    const { submitRequest } = useFreewheelContext();
    const sendRequest = url => submitRequest(url);
    const sendRequestRef = useRef(sendRequest);

    return sendRequestRef.current;
};

export default useFreewheel;