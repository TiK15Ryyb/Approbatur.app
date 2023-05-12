import React from 'react';

const Badges: React.FC<{ visitedBars: number }> = ({ visitedBars }) => {
    if (visitedBars >= 10) {
      return <div className="absolute z-20 top-12 p-3 m-3 bg-yellow-400 rounded text-black">Megagigachad</div>;
    } else if (visitedBars >= 5) {
      return <div className="absolute z-20 top-12 p-3 m-3 bg-yellow-400 rounded text-black">Tripla</div>;
    } else if (visitedBars >= 2) {
      return <div className="absolute z-20 top-12 p-3 m-3 bg-yellow-400 rounded text-black">Tupla</div>;
    } else {
      return null;
    }
  };
  
export { Badges }