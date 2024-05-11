import { Spinner } from '@cloudscape-design/components';
import { Mode } from '@cloudscape-design/global-styles';
import styles from './styles.module.scss';
import { useAppLayoutStore } from '../../../store/use-app-layout-store';

export const Loader = () => {
  const { theme } = useAppLayoutStore((s) => ({ theme: s.theme }));

  return (
    <div className={styles.container}>
      <Spinner size='large' variant={theme === Mode.Light ? 'normal' : 'disabled'} />
    </div>
  );
};
