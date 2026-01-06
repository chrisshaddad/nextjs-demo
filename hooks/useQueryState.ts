'use client';
import { useCallback, useEffect, useState } from 'react';

export default function useQueryState(paramName: string, defaultValue: string) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setValue(params.get(paramName) || defaultValue);
  }, []);

  const updateValue = useCallback(
    (newValue: string) => {
      setValue(newValue);
      const params = new URLSearchParams(window.location.search);
      if (newValue != '') {
        params.set(paramName, newValue);
      } else {
        params.delete(paramName);
      }
      window.history.replaceState(null, '', `?${params.toString()}`);
    },
    [paramName]
  );

  return [value, updateValue] as const;
}
