import { forwardRef } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import {
  Link,
  LinkProps,
} from '@frontend/shared/design-system/components/atoms/Link';

type Props = Omit<LinkProps, 'asChild'> & {
  to: string;
};

export const RouterLink = forwardRef<HTMLAnchorElement, Props>(
  function RouterLink(props, ref) {
    const { to, children, ...rest } = props;
    return (
      <Link asChild ref={ref} {...rest}>
        <ReactRouterLink to={to}>{children}</ReactRouterLink>
      </Link>
    );
  },
);
