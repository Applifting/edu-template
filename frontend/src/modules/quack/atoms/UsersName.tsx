import { chakra, type ChakraProps } from '@frontend/shared/design-system';

export type UsersNameProps = ChakraProps & {
  name: string;
};

export function UsersName({ name, ...restProps }: UsersNameProps) {
  return (
    <chakra.span color="blackAlpha.800" fontWeight="bold" {...restProps}>
      {name}
    </chakra.span>
  );
}
