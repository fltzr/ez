import { SideNavigation } from '@cloudscape-design/components';
import { useLocation, useNavigate } from 'react-router-dom';

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation logic here
  return (
    <SideNavigation
      activeHref={location.pathname}
      items={[
        {
          type: 'link',
          text: 'Dashboard',
          href: '/',
        },
        {
          type: 'section',
          text: 'Courtreserve',
          items: [
            {
              type: 'link',
              text: 'Events',
              href: '/courtreserve/events',
            },
          ],
        },
        {
          type: 'section',
          text: 'Products',
          items: [
            {
              type: 'link',
              text: 'Create',
              href: '/products/create',
            },
          ],
        },
        { type: 'divider' },
        {
          type: 'section',
          text: 'Settings',
          items: [
            {
              type: 'link',
              text: 'Profile',
              href: '/settings/profile',
            },
            {
              type: 'link',
              text: 'Security',
              href: '/settings/security',
            },
          ],
        },
      ]}
      onFollow={(e) => {
        e.preventDefault();
        navigate(e.detail.href, { replace: true });
      }}
    />
  );
};
