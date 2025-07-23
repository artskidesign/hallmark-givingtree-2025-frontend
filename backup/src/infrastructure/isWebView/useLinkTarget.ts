import { useSelector } from 'react-redux';
import RootState from '../redux/RootState';


const selector = (state: RootState) => state.isWebView.webView ? '' : '_blank';

const useLinkTarget = () => {
    return useSelector(selector);
}

export default useLinkTarget;