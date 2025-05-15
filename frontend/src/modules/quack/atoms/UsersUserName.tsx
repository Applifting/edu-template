import { chakra, type ChakraProps } from '@frontend/shared/design-system';

export type UsersUserNameProps = ChakraProps & { username: string };

export function UsersUserName({ username, ...restProps }: UsersUserNameProps) {
  return (
    <chakra.span color="gray.500" fontSize="sm" {...restProps}>
      @{username}
    </chakra.span>
  );
}
