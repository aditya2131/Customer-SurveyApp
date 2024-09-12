// src/components/ThankYouScreen.js
import React, { useEffect } from 'react';

const ThankYouScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.reload(); // Refresh the page to show the welcome screen again
    }, 5000);
  }, []);

  return (
    <div className="thank-you-screen">
      <h1>Thank you for your time!</h1>
    </div>
  );
};

export default ThankYouScreen;
