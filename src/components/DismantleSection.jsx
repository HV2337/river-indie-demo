import React, { useEffect, useRef, useState } from 'react';
import { useFrameSequence } from '../hooks/useFrameSequence';
import { motion, AnimatePresence } from 'framer-motion';

const features = [
  {
    range: [0, 60],
    title: "Unmatched Utility.",
    description: "Built from the ground up to conquer uneven paths and urban jungles with exceptional ground clearance."
  },
  {
    range: [61, 120],
    title: "Massive Storage.",
    description: "A best-in-class 55-liter space. Featuring a 43L under-seat compartment and a 12L glovebox."
  },
  {
    range: [121, 180],
    title: "Exhilarating Power.",
    description: "Go 0 to 40 km/h in 3.7 seconds. The peak 6.7 kW motor delivers instant torque exactly when you need it."
  },
  {
    range: [181, 240],
    title: "Smart LCD Deck.",
    description: "A crystal clear color display keeping you connected, informed, and in absolute control of every ride mode."
  }
];

const DismantleSection = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [frame, setFrame] = useState(0);
  const totalFrames = 240;
  
  const { images, isLoaded, drawFrame, loaded } = useFrameSequence('/src/assets/frames/dismantle', totalFrames);

  // Resize canvas
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        // Responsive canvas sizing
        const isMobile = window.innerWidth < 1024;
        canvasRef.current.width = isMobile ? window.innerWidth : window.innerWidth / 2;
        canvasRef.current.height = window.innerHeight;
        
        // Redraw current frame
        drawFrame(canvasRef.current, canvasRef.current.getContext('2d'), frame);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame, frame]);

  // Scroll logic for sticky mapping
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!isLoaded || !containerRef.current || !canvasRef.current) return;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const { top, height } = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          // Progress from 0 to 1 as user scrolls through the 400vh container
          const scrollableDistance = height - windowHeight;
          const scrollProgress = Math.max(0, Math.min(1, -top / scrollableDistance));
          
          const targetFrame = Math.round(scrollProgress * (totalFrames - 1));
          
          if (targetFrame !== frame) {
            setFrame(targetFrame);
            drawFrame(canvasRef.current, canvasRef.current.getContext('2d'), targetFrame);
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount incase user refreshes mid-scroll
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoaded, drawFrame, frame, totalFrames]);

  // Find the feature that should be displayed based on the frame index
  const activeFeature = features.find(f => frame >= f.range[0] && frame <= f.range[1]);

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-brand-bgSecondary">
      <div className="sticky top-0 w-full h-screen flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Side: Canvas Animation */}
        <div className="w-full lg:w-1/2 h-full relative flex items-center justify-center bg-brand-bg">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full object-cover mix-blend-screen opacity-90"
          />
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center text-brand-textMuted text-xs tracking-[0.2em] uppercase bg-brand-bg">
              Loading sequence... {Math.round((loaded / totalFrames) * 100)}%
            </div>
          )}
        </div>

        {/* Right Side: Feature Reveal */}
        <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-8 lg:p-24 absolute lg:relative z-10 lg:z-auto bg-black/40 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none pointer-events-none">
          <div className="max-w-lg w-full">
            <AnimatePresence mode="wait">
              {activeFeature && (
                <motion.div
                  key={activeFeature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }} /* Apple-like cubic bezier */
                  className="flex flex-col gap-6"
                >
                  <h2 className="text-4xl lg:text-7xl font-semibold tracking-tighter text-brand-text leading-tight">
                    {activeFeature.title}
                  </h2>
                  <p className="text-xl lg:text-2xl text-brand-textMuted font-normal leading-relaxed text-balance">
                    {activeFeature.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DismantleSection;
