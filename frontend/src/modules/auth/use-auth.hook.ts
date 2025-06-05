import { useApolloClient } from '@frontend/utils/apollo-context';
import { authClient } from '@frontend/utils/auth-client';

import { SignUpMutation } from './graphql/SignUpMutation';

export type User = {
  id: string;
  email: string;
  name: string;
  role?: string;
  profileImageUrl?: string;
  username: string;
};

export function useAuth() {
  const { data, isPending, error: authError } = authClient.useSession();
  const apolloClient = useApolloClient();

  const user: User | null = data?.user
    ? {
        id: data?.user?.id,
        email: data?.user?.email,
        name: data?.user?.name,
        profileImageUrl: data?.user?.image ?? undefined,
        username: data?.user?.username ?? '',

        // todo: figure out how to properly type this
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        role: (data?.user as any)?.role ?? undefined,
      }
    : null;

  // Transform BetterAuth error to regular Error
  const error = authError
    ? new Error(authError.message || 'Authentication error')
    : undefined;

  const signIn = async (
    email: string,
    password: string,
    rememberMe = false,
    callbackURL?: string,
  ) =>
    await authClient.signIn.email({ email, password, rememberMe, callbackURL });

  const signOut = async () => await authClient.signOut();

  const signUp = async (
    email: string,
    password: string,
    name: string,
    username: string,
    profileImage?: File | null,
  ) => {
    try {
      await apolloClient.mutate({
        mutation: SignUpMutation,
        variables: {
          data: {
            email,
            password,
            name,
            username,
            profilePicture: profileImage ?? undefined,
          },
        },
      });

      // Use authClient for sign up/in
      return await authClient.signIn.email({ email, password });
    } catch (err) {
      console.error('Error during sign up:', err);
      throw err;
    }
  };

  return { isPending, error, user, signIn, signOut, signUp };
}
