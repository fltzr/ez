import { BreadcrumbGroup, type BreadcrumbGroupProps } from '@cloudscape-design/components';
import { type UIMatch, useMatches, useNavigate } from 'react-router-dom';

type AppUIMatch = UIMatch<unknown, { crumb?: string } | undefined>;

export const Breadcrumbs = () => {
  const navigate = useNavigate();
  const matches = useMatches() as AppUIMatch[];
  const crumbs: BreadcrumbGroupProps.Item[] = matches
    .filter((m) => Boolean(m.handle?.crumb))
    .map((m) => ({ text: m.handle?.crumb ?? '', href: m.pathname }));

  return (
    crumbs.length > 1 && (
      <BreadcrumbGroup
        items={crumbs}
        onClick={(event) => {
          event.preventDefault();
          navigate(event.detail.href);
        }}
      />
    )
  );
};
