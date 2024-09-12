import { type ReactNode } from 'react';

import { Box, type BoxProps, Center } from '@frontend/shared/design-system';

export type MainSectionProps = BoxProps & {
  children: ReactNode;
};

export function MainSection({ children, ...restProps }: MainSectionProps) {
  return (
    <Center borderTop="1px" borderColor="blackAlpha.200">
      <Box as="section" m="4" minW="30rem" {...restProps}>
        {children}
      </Box>
    </Center>
  );
}
