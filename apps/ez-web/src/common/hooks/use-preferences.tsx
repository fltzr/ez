import { useEffect } from 'react';
import { applyMode as applyTheme, applyDensity } from '@cloudscape-design/global-styles';
import { useAppLayoutStore } from '@ez/web-state-management';

export const usePreferences = () => {
  const { theme, density } = useAppLayoutStore((s) => ({
    theme: s.theme,
    density: s.density,
  }));

  useEffect(() => {
    applyTheme(theme, document.documentElement);
  }, [theme]);

  useEffect(() => {
    applyDensity(density, document.documentElement);
  }, [density]);
};
