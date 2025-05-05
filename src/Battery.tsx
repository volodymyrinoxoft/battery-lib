import React from 'react';
import { useBattery } from './useBattery';

export const Battery: React.FC = () => {
  const battery = useBattery();

  if (!battery) return <p>Loading battery info...</p>;

  return (
    <div>
      🔋 Battery: {battery.level * 100}% —{' '}
      {battery.charging ? 'Charging ⚡️' : 'Not Charging'}
    </div>
  );
};
