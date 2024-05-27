import { Providers } from './providers';
import { usePreferences } from '../common/hooks/use-preferences';

export const App: React.FC = () => {
  usePreferences();

  return <Providers />;
};
