import type { PropsWithChildren } from 'react';
import type { ButtonDropdownProps } from '@cloudscape-design/components';
import { SpaceBetween, ButtonDropdown, Link } from '@cloudscape-design/components';

import { CenterContainer } from '@ez/web-ui';
import styles from './styles.module.scss';

const LOCALE_OPTIONS: ButtonDropdownProps['items'] = [
  { id: 'en-us', text: 'English (United States)' },
  { id: 'en-gb', text: 'English (United Kingdom)' },
  { id: 'fr', text: 'Français' },
];

export const BaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <CenterContainer>
      <div className={styles.content}>
        <SpaceBetween size='s'>
          {children}
          <footer style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ButtonDropdown variant='normal' items={LOCALE_OPTIONS}>
              English (United States)
            </ButtonDropdown>
            <SpaceBetween direction='horizontal' size='s'>
              <Link>Help</Link>
              <Link>Privacy</Link>
              <Link>Terms</Link>
            </SpaceBetween>
          </footer>
        </SpaceBetween>
      </div>
    </CenterContainer>
  );
};
