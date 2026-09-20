import { useState, useEffect, useCallback } from 'react';
import { NetworkService } from '../services/networkService';

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState<boolean>(NetworkService.isOnlineFast());
  const [isChecking, setIsChecking] = useState<boolean>(false);

  const recheck = useCallback(async () => {
    setIsChecking(true);
    try {
      const result = await NetworkService.checkInternetConnection(true);
      setIsOnline(result);
      return result;
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    // Initial verification
    NetworkService.checkInternetConnection().then((online) => {
      setIsOnline(online);
    });

    const unsubscribe = NetworkService.subscribe((online) => {
      setIsOnline(online);
    });

    return unsubscribe;
  }, []);

  return { isOnline, isChecking, recheck };
};
