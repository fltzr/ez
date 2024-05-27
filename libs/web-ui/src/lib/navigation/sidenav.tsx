import type { SideNavigationProps } from '@cloudscape-design/components';
import { SideNavigation } from '@cloudscape-design/components';
import { useLocation, useNavigate } from 'react-router-dom';

type NavigationProps = {
  items: SideNavigationProps['items'];
};

export const Navigation = ({ items }: NavigationProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation logic here
  return (
    <SideNavigation
      activeHref={location.pathname}
      header={{
        text: '',
        href: '/',
      }}
      items={items}
      onFollow={(e) => {
        e.preventDefault();
        navigate(e.detail.href, { replace: true });
      }}
    />
  );
};
