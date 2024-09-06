import React, { useState } from 'react';

const RouletteWheel = () => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState(null);

  const prizes = [
    '10% off',
    '15% off',
    'Buy 1 Get 1 Free',
    '20% off',
  ];

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const prizeAngle = 360 / prizes.length;
    const finalRotation = 3600 + randomIndex * prizeAngle;

    setRotation(finalRotation);
    setTimeout(() => {
      setSpinning(false);
      setSelectedPrize(prizes[randomIndex]);
    }, 4000); // Duration of the spin (4 seconds)
  };

  return (
    <div style={styles.wheelContainer}>
      <div
        className={`wheel ${spinning ? 'spinning' : ''}`}
        style={{ ...styles.wheel, transform: `rotate(${rotation}deg)` }}
      >
        {prizes.map((prize, index) => (
          <div
            key={index}
            className="segment"
            style={{
              ...styles.segment,
              transform: `rotate(${index * (360 / prizes.length)}deg)`,
              backgroundColor: index % 2 === 0 ? 'red' : 'black',
            }}
          >
            <span style={styles.prize}>{prize}</span>
          </div>
        ))}
      </div>
      <button onClick={spinWheel} disabled={spinning} style={styles.button}>
        {spinning ? 'Spinning...' : 'Spin the Wheel'}
      </button>
      {selectedPrize && !spinning && (
        <div style={styles.result}>
          Congratulations! You won: {selectedPrize}
        </div>
      )}
    </div>
  );
};

const styles = {
  wheelContainer: {
    textAlign: 'center',
    marginTop: '50px',
  },
  wheel: {
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    border: '10px solid #ccc',
    position: 'relative',
    margin: '0 auto',
    transition: 'transform 4s cubic-bezier(0.33, 1, 0.68, 1)',
  },
  segment: {
    width: '50%',
    height: '50%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transformOrigin: '0% 0%',
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prize: {
    transform: 'rotate(90deg)',
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  result: {
    marginTop: '20px',
    fontSize: '20px',
    color: 'green',
  },
};

export default RouletteWheel;
