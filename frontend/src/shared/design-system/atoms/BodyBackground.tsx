import { Global } from '@emotion/react';

import { useToken } from '../hooks';

export type BodyBackgroundProps = { bg: string };

export function BodyBackground({ bg }: BodyBackgroundProps) {
  const [bodyBackground] = useToken('colors', [bg]);

  return (
    <Global
      styles={{
        body: { background: bodyBackground },
      }}
    />
  );
}
