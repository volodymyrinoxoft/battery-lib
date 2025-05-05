import { useEffect, useState } from 'react';

export interface BatteryState {
  charging: boolean;
  level: number;
}

export const useBattery = (): BatteryState | null => {
  const [battery, setBattery] = useState<BatteryState | null>(null);

  useEffect(() => {
    let batteryManager: BatteryManager;

    const updateBattery = () => {
      setBattery({
        charging: batteryManager.charging,
        level: batteryManager.level,
      });
    };

    navigator.getBattery?.().then((bat) => {
      batteryManager = bat;
      updateBattery();
      batteryManager.addEventListener('chargingchange', updateBattery);
      batteryManager.addEventListener('levelchange', updateBattery);
    });

    return () => {
      batteryManager?.removeEventListener('chargingchange', updateBattery);
      batteryManager?.removeEventListener('levelchange', updateBattery);
    };
  }, []);

  return battery;
};
