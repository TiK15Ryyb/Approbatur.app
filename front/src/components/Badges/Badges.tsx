import React from 'react';

const Badges: React.FC<{ visitedBars: number, totalBars: number }> = ({ visitedBars, totalBars }) => {
    if (visitedBars >= totalBars) {
      return <div className="absolute z-20 top-12 p-3 m-3 bg-red-400 rounded text-black">Megagigachad</div>;
    } else if (visitedBars >= totalBars * 0.75) {
      return <div className="absolute z-20 top-12 p-3 m-3 bg-green-400 rounded text-black">Tripla</div>;
    } else if (visitedBars >= totalBars * 0.5) {
      return <div className="absolute z-20 top-12 p-3 m-3 bg-yellow-400 rounded text-black">Tupla</div>;
    } else {
      return null;
    }
  };
  
export { Badges }