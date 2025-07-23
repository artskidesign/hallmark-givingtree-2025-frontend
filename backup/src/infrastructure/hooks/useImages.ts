import { useEffect, useState } from 'react';

const loadSingleImage = (src: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = resolve;
    img.src = src;
    img.style.display = 'none';
    document.body.appendChild(img);
  });
};

const useImages: (images: Array<string>) => boolean = (images) => {
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

  useEffect(() => {
    const imageLoadingPromises = images.map(loadSingleImage);
    Promise.all(imageLoadingPromises).then(() => {
      setImagesLoaded(true);
    });
  }, [images]);

  return imagesLoaded;
};

export default useImages;
