import React, { useState, useEffect } from 'react';
import BootAnimation from '../os/BootAnimation';
import Desktop from '../os/Desktop';
import useOsStore from '../store/osStore';

const OS = () => {
  const isBooted = useOsStore(state => state.isBooted);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mobile detection is kept in case we need it for context elsewhere, 
  // but we no longer block the user. We let the OS handle it responsively.

  const initFileSystem = useOsStore(state => state.initFileSystem);
  
  useEffect(() => {
    initFileSystem();
  }, [initFileSystem]);

  return (
    <div className={`h-screen w-screen bg-bg-dark overflow-hidden relative`}>
      {!isBooted ? (
        <BootAnimation />
      ) : (
        <Desktop />
      )}
    </div>
  );
};

export default OS;
