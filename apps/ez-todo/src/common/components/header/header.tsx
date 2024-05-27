import type { PropsWithChildren } from 'react';
import { lazy, useState } from 'react';
import { TopNavigation } from '@cloudscape-design/components';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';

const LazyPreferencesModal = lazy(() => import('../preferences-modal/preferences-modal'));

const HeaderPortal = ({ children }: PropsWithChildren) => {
  const dom = document.querySelector('#h');

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return dom ? <>{createPortal(<>{children}</>, dom)}</> : null;
};

export const Header = () => {
  const navigate = useNavigate();
  const [isPreferencesModalVisible, setIsPreferencesModalVisible] = useState(false);

  return (
    <>
      <LazyPreferencesModal
        visible={isPreferencesModalVisible}
        onDismiss={() => {
          setIsPreferencesModalVisible(false);
        }}
      />
      <HeaderPortal>
        <div className={styles.header}>
          <TopNavigation
            identity={{
              href: '/',
              title: 'Ez Todo',
              onFollow: (event) => {
                event.preventDefault();
                navigate('/');
              },
            }}
            utilities={[
              {
                type: 'button',
                iconName: 'settings',
                onClick: () => setIsPreferencesModalVisible(true),
                ariaLabel: 'Open preferences modal',
                iconAlt: 'Settings icon',
              },
            ]}
          />
        </div>
      </HeaderPortal>
    </>
  );
};
