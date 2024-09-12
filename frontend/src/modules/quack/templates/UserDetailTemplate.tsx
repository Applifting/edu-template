import { useFragment } from '@frontend/gql';
import { AuthUser } from '@frontend/modules/auth/auth-core';
import { type AddQuackFormState } from '@frontend/modules/quack/types/addQuackForm';
import {
  Button,
  ErrorBanner,
  Loading,
  ReloadButton,
} from '@frontend/shared/design-system';
import { MainSection, TopNavigation } from '@frontend/shared/navigation';

import {
  QuackUserDetailFragment,
  type QuackUserDetailFragmentType,
} from '../graphql/QuackUserDetailFragment';
import { QuackForm, UserDetailHeader } from '../molecules';
import { QuackList } from '../organisms';

type Props = {
  userName?: string;
  userFragment: QuackUserDetailFragmentType | null;
  loading: boolean;
  error?: Error;
  onReload: () => void;
  quackFormState: AddQuackFormState;
  currentUser: AuthUser | null;
};

export function UserDetailTemplate({
  userName,
  userFragment,
  loading,
  error,
  onReload,
  quackFormState,
  currentUser,
}: Props) {
  const showQuackForm =
    quackFormState && currentUser && currentUser.userName === userName;

  const user = useFragment(QuackUserDetailFragment, userFragment);

  return (
    <>
      <TopNavigation />
      <MainSection maxW="30rem">
        {loading && !user && <Loading />}

        {error && (
          <ErrorBanner title={error.message}>
            <Button colorScheme="red" onClick={onReload}>
              Reload
            </Button>
          </ErrorBanner>
        )}

        {user ? (
          <>
            <UserDetailHeader
              name={user.name}
              userName={user.userName}
              profileImageUrl={user.profileImageUrl}
            />
            {showQuackForm && <QuackForm {...quackFormState} mt="2" />}
            <ReloadButton
              onClick={onReload}
              isLoading={loading}
              float="right"
            />
            <QuackList quacks={user.quacks} />
          </>
        ) : null}
      </MainSection>
    </>
  );
}
