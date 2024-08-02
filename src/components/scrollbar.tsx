import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const Scrollbar = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const winScroll = window.pageYOffset;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (winScroll / height) * 100;
    setScrollPercentage(scrolled);
    setIsVisible(true);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 1500);
    return () => clearTimeout(timer);
  }, [scrollPercentage]);

  const barAnimation = useSpring({
    height: `${scrollPercentage}%`,
    opacity: isVisible ? 1 : 0,
    config: { tension: 300, friction: 20 }
  });

  return (
    <div 
      style={{
        position: 'fixed',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '8px',
        height: '100px',
        backgroundColor: 'rgba(74, 85, 104, 0.2)',
        borderRadius: '4px',
        overflow: 'hidden',
        zIndex: 9999,
      }}
    >
      <animated.div 
        style={{
          width: '100%',
          backgroundColor: '#4A5568',
          borderRadius: '4px',
          ...barAnimation,
        }}
      />
    </div>
  );
};

export default Scrollbar;