import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { gql } from '@frontend/gql';
import { useAuth } from '@frontend/modules/auth';

import { SignUpTemplate } from '../templates';

const SIGNUP_MUTATION = gql(/* GraphQL */ `
  mutation SignUp(
    $email: String!
    $name: String!
    $password: String!
    $userName: String!
    $profileImage: Upload
  ) {
    signUp(
      email: $email
      name: $name
      password: $password
      userName: $userName
      profileImage: $profileImage
    ) {
      user {
        id
        name
        userName
        profileImageUrl
      }
      token
    }
  }
`);

export function SignUpPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [signupRequest, signupRequestState] = useMutation(SIGNUP_MUTATION, {
    onCompleted: ({ signUp: { user, token } }) => {
      auth.signIn({ token, user });
      navigate('/');
    },
    onError: () => {},
  });

  const handleSignUpFormSubmit = useCallback(
    (variables: {
      email: string;
      name: string;
      userName: string;
      password: string;
      profileImage: File | null;
    }) => {
      signupRequest({ variables });
    },
    [signupRequest],
  );

  return (
    <SignUpTemplate
      isLoading={signupRequestState.loading}
      error={signupRequestState.error}
      onSubmit={handleSignUpFormSubmit}
    />
  );
}
