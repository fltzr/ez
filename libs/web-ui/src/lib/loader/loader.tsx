import { Spinner } from '@cloudscape-design/components';
import styles from './styles.module.scss';

export const Loader = () => {
  return (
    <div className={styles.container}>
      <Spinner size='large' variant='normal' />
    </div>
  );
};
