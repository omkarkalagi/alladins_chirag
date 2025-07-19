// src/components/BackgroundTest.js
import React from 'react';

function BackgroundTest() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 255, 0, 0.3)', // Semi-transparent green
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '2rem',
      fontWeight: 'bold',
    }}>
      Background Test Layer - You Should See This
    </div>
  );
}

export default BackgroundTest;