import { useState, useEffect, useCallback } from 'react';

export const useFrameSequence = (folderPath, frameCount, extension = 'jpg') => {
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    let loadedCount = 0;
    const imgArray = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      // Pad to 3 digits e.g. 001, 002
      const paddedIndex = i.toString().padStart(3, '0');
      
      // We will load the images from the public path / src path
      // In Vite, static assets not in /public need to be imported, but for 240 frames, 
      // dynamically importing them all can be tricky.
      // Easiest is to rely on Vite's asset handling or public directory.
      // Wait: Since the user specifically put them in `src/assets/frames/hero/ezgif-frame-001.jpg`,
      // Vite during `npm run dev` serves `src/assets/...` directly at `/src/assets/...`
      img.src = `${folderPath}/ezgif-frame-${paddedIndex}.${extension}`;
      
      img.onload = () => {
        loadedCount++;
        setLoaded(loadedCount);
      };
      
      imgArray.push(img);
    }
    
    setImages(imgArray);
  }, [folderPath, frameCount, extension]);

  const drawFrame = useCallback((canvas, context, frameIndex) => {
    if (!canvas || !context || images.length === 0) return;
    
    // Ensure index is within bounds
    const index = Math.max(0, Math.min(frameIndex, images.length - 1));
    const img = images[index];
    
    if (img && img.complete) {
      // Calculate aspect ratio to fit canvas (cover behavior)
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        img, 
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    }
  }, [images]);

  return { images, loaded, drawFrame, isLoaded: loaded === frameCount };
};
