import { forwardRef } from 'react';
import {
  Icon as ChakraIcon,
  type IconProps as ChakraIconProps,
} from '@chakra-ui/react';

export type IconProps = ChakraIconProps & {
  isSpinning?: boolean;
};

export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  { isSpinning = false, ...restProps },
  ref,
) {
  return (
    <ChakraIcon
      ref={ref}
      {...restProps}
      animation={isSpinning ? `spin 2s linear infinite` : undefined}
    />
  );
});
