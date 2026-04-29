import React, { useEffect, useRef, useState } from 'react';
import { useFrameSequence } from '../hooks/useFrameSequence';

const HeroSection = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [frame, setFrame] = useState(0);
  const totalFrames = 240;

  const { images, isLoaded, drawFrame, loaded } = useFrameSequence('/src/assets/frames/hero', totalFrames);

  // Resize canvas
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        drawFrame(canvasRef.current, canvasRef.current.getContext('2d'), frame);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame, frame]);

  // Autoplay animation once loaded
  useEffect(() => {
    let animationFrameId;
    let currentFrame = 0;
    let lastTime = performance.now();
    const fps = 30; // Control playback speed perfectly
    const interval = 1000 / fps;

    const playAnimation = (time) => {
      if (currentFrame < totalFrames - 1) {
        animationFrameId = requestAnimationFrame(playAnimation);
        const deltaTime = time - lastTime;

        if (deltaTime > interval) {
          currentFrame++;
          setFrame(currentFrame);
          lastTime = time - (deltaTime % interval);

          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            drawFrame(canvasRef.current, ctx, currentFrame);
          }
        }
      }
    };

    if (isLoaded && canvasRef.current) {
      // Draw first frame immediately
      drawFrame(canvasRef.current, canvasRef.current.getContext('2d'), 0);
      // Start playback loop
      animationFrameId = requestAnimationFrame(playAnimation);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isLoaded, drawFrame, totalFrames]);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-brand-bg overflow-hidden flex flex-col items-center justify-center">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-1000"
      />

      {/* Loading State overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-bg z-50">
          <div className="text-brand-textMuted uppercase tracking-[0.3em] text-sm mb-4">Loading Experience</div>
          <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-text transition-all duration-300"
              style={{ width: `${(loaded / totalFrames) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Typography Overlay */}
      <div className="relative z-10 text-center flex flex-col items-center pointer-events-none mt-[30vh]">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-brand-text mb-4 drop-shadow-2xl">
          River Indie.
        </h1>
        <p className="text-xl md:text-2xl font-light text-brand-text max-w-2xl text-balance drop-shadow-lg">
          The SUV of Scooters.
        </p>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-brand-textMuted text-xs tracking-[0.2em] uppercase flex flex-col items-center gap-4 opacity-70">
        <span>Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-brand-textMuted to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
