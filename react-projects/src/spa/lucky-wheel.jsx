import React, { useState } from 'react';
import './spa.css';

const LuckyWheel = () => {
  const sectors = [
    'Fizika',
    'Kémia',
    'Matek',
    'Biosz',
    'Informatika',
    'Történelem',
  ];
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);

  const spinWheel = () => {
    if (spinning) return;

    const extraRotation = 1800 + Math.random() * 360;
    const newRotation = rotation + extraRotation;

    setRotation(newRotation);
    setSpinning(true);
    setResult(null);

    setTimeout(() => {
      setSpinning(false);

      const actualDeg = newRotation % 360;

      const sectorAngle = 360 / sectors.length;

      let index = Math.floor((360 - actualDeg) / sectorAngle);

      const finalIndex = (index - 2 + sectors.length) % sectors.length;

      setResult(sectors[finalIndex]);
    }, 4000);
  };

  return (
    <div className="wheel-container">
      <h3>Tudomány-kerék</h3>
      <div className="wheel-wrapper">
        <div className="wheel-pointer">▼</div>
        <div
          className="wheel"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 4s cubic-bezier(0.1, 0, 0.2, 1)',
          }}
        >
          {sectors.map((s, i) => (
            <div
              key={i}
              className="sector"
              style={{ '--i': i, '--total': sectors.length }}
            >
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>
      <button className="btn" onClick={spinWheel} disabled={spinning}>
        Pörgetés!
      </button>
      {result && (
        <div className="result-box">
          A választott terület: <strong>{result}</strong>
        </div>
      )}
    </div>
  );
};

export default LuckyWheel;
