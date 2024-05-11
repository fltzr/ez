import { lazy, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { TopNavigation } from '@cloudscape-design/components';
import styles from './styles.module.scss';

const LazyPreferencesModal = lazy(() => import('../preferences-modal/preferences-modal'));

const HeaderPortal = ({ children }: { children: ReactNode }) => {
  const dom = document.querySelector('#h');

  return dom ? createPortal(children, dom) : null;
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
              title: 'CSD Template',
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
              },
            ]}
          />
        </div>
      </HeaderPortal>
    </>
  );
};
