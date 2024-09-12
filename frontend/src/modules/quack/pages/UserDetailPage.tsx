import { useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { gql } from '@frontend/gql';
import { useAuth } from '@frontend/modules/auth';
import { useAddQuackFormState } from '@frontend/modules/quack/hooks/useAddQuackFormState';
import { NotFoundPage } from '@frontend/shared/navigation';

import { UserDetailTemplate } from '../templates';

const USER_DETAIL_QUERY = gql(/* GraphQL */ `
  query UserDetail($userName: String!) {
    user(userName: $userName) {
      ...QuackUserDetail
    }
  }
`);

export function UserDetailPage() {
  const { user } = useAuth();
  const { userName } = useParams();

  const userFetcher = useQuery(USER_DETAIL_QUERY, {
    variables: { userName: userName ?? '' },
  });

  const { refetch } = userFetcher;

  const refetchUser = useCallback(() => {
    refetch();
  }, [refetch]);

  const quackFormState = useAddQuackFormState({
    onCompleted: userFetcher.refetch,
  });

  if (userFetcher.data?.user === null) {
    return <NotFoundPage />;
  }

  return (
    <UserDetailTemplate
      userFragment={userFetcher.data?.user ?? null}
      loading={userFetcher.loading}
      error={userFetcher.error}
      onReload={refetchUser}
      quackFormState={quackFormState}
      currentUser={user}
      userName={userName}
    />
  );
}
