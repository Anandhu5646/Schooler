import React, { useEffect, useState } from 'react';
import './Toaster.css';

const Toaster = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showToaster = () => {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 3000); 
    };

    window.addEventListener('focus', showToaster);

    return () => {
      window.removeEventListener('focus', showToaster);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="floating-toaster">
      <p>My Floating Toaster!</p>
    </div>
  );
};

export default Toaster;
