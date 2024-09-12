import { chakra, type ChakraProps } from '@frontend/shared/design-system';

export type UsersUserNameProps = ChakraProps & {
  userName: string;
};

export function UsersUserName({ userName, ...restProps }: UsersUserNameProps) {
  return (
    <chakra.span color="gray.500" fontSize="sm" {...restProps}>
      @{userName}
    </chakra.span>
  );
}
