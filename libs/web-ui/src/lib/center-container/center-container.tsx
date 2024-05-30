import type { PropsWithChildren } from 'react';

import styles from './styles.module.scss';

export const CenterContainer = ({ children }: PropsWithChildren) => {
  return <div className={styles.container}>{children}</div>;
};
