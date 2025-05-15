import { useFragment } from '@frontend/gql';
import { route } from '@frontend/route';
import { AvatarPhoto, Box, Stack } from '@frontend/shared/design-system';
import { RouterLink } from '@frontend/shared/navigation';
import { formatDate } from '@shared/date';

import { UsersName, UsersUserName } from '../atoms';
import {
  BaseQuackFragment,
  type BaseQuackFragmentType,
} from '../graphql/BaseQuackFragment';

export type QuackProps = { quackFragment: BaseQuackFragmentType };

export function Quack({ quackFragment }: QuackProps) {
  const {
    user: { name, username, profileImageUrl },
    text,
    createdAt,
  } = useFragment(BaseQuackFragment, quackFragment);

  const linkToUser = route.userDetail(username);
  const nameInitials = name
    .split(' ')
    .map((word) => word[0])
    .join('');

  return (
    <Stack
      as="article"
      direction="row"
      spacing="4"
      width="100%"
      pb="2"
      mt="2"
      borderBottom="1px"
      borderColor="gray.200"
    >
      <Box width="16">
        <RouterLink to={linkToUser}>
          <AvatarPhoto
            size="16"
            src={
              profileImageUrl ??
              `https://placehold.co/200x200?text=${nameInitials}`
            }
            alt={name}
          />
        </RouterLink>
      </Box>
      <Stack spacing="0">
        <Box>
          <RouterLink to={linkToUser} color="inherit">
            <UsersName name={name} /> <UsersUserName username={username} />
          </RouterLink>
          {' - '}
          <Box as="span" fontSize="sm" color="gray.500">
            {formatDate(createdAt)}
          </Box>
        </Box>
        <Box wordBreak="break-word" whiteSpace="pre-line">
          {text}
        </Box>
      </Stack>
    </Stack>
  );
}
