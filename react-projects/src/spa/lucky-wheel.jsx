import React, { useState } from 'react';
import './spa.css';

const Sector = ({ text, index, totalSectors }) => {
  const angle = (360 / totalSectors) * index;

  return (
    <div className="sector" style={{ transform: `rotate(${angle}deg)` }}>
      <span className="sector-text">{text}</span>
    </div>
  );
};

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

      const index = Math.round((360 - actualDeg) / sectorAngle);
      const finalIndex = index % sectors.length;

      setResult(sectors[finalIndex]);
    }, 4000);
  };

  const gradientStops = sectors
    .map((_, i) => {
      const color = i % 2 === 0 ? 'var(--primary)' : 'var(--surface)';
      const start = (i * 360) / sectors.length;
      const end = ((i + 1) * 360) / sectors.length;
      return `${color} ${start}deg ${end}deg`;
    })
    .join(', ');

  return (
    <div className="wheel-container">
      <h3>Tudomány-kerék</h3>
      <div className="wheel-wrapper">
        <div className="wheel-pointer">▼</div>
        <div
          className="wheel"
          style={{
            background: `conic-gradient(from -${360 / sectors.length / 2}deg, ${gradientStops})`,
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 4s cubic-bezier(0.1, 0, 0.2, 1)',
          }}
        >
          {sectors.map((s, i) => (
            <Sector key={i} text={s} index={i} totalSectors={sectors.length} />
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
