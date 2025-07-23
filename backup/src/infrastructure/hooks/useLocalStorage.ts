import { useState } from 'react';

const useLocalStorage: (key: string, defaultValue: string) => [string, (value: string) => void] = (key, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ?? defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const setValue = (value: string) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, value);
    } catch {
      // localStorage not available
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
