import { useEffect } from 'react';

const scrollToTop = () => window.scrollTo(0, 0);

const useScrollToTop: (pathName: string) => void = pathName => {
    useEffect(scrollToTop, [pathName]);
}

export default useScrollToTop;