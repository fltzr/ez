import type { PropsWithChildren } from 'react';
import { lazy, useState } from 'react';
import { TopNavigation } from '@cloudscape-design/components';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';
import { useAuthStore } from '../../../store/use-auth-store';

const LazyPreferencesModal = lazy(() => import('../preferences-modal/preferences-modal'));

const HeaderPortal = ({ children }: PropsWithChildren) => {
  const dom = document.querySelector('#h');

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return dom ? <>{createPortal(<>{children}</>, dom)}</> : null;
};

export const Header = () => {
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

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
              {
                type: 'menu-dropdown',
                text: `Welcome!`,
                description: authStore.user?.email,
                items: [
                  {
                    id: 'header__sign-out',
                    text: 'Sign out',
                  },
                ],
                onItemClick: (event) => {
                  event.preventDefault();

                  if (event.detail.id === 'header__sign-out') {
                    const pathname = location.pathname;

                    console.log('Header: signout: pathname=', pathname);

                    navigate('/signin', { state: { from: pathname } });
                    authStore.signout();
                  }
                },
              },
            ]}
          />
        </div>
      </HeaderPortal>
    </>
  );
};
