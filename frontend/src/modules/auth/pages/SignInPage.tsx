import { useNavigate } from 'react-router';

import { SignInTemplate } from '@frontend/modules/auth/templates/SignInTemplate';
import { useAuth } from '@frontend/modules/auth/use-auth.hook';

export function SignInPage() {
  const { signIn, isPending, error } = useAuth();
  const navigate = useNavigate();

  const handleSignInFormSubmit = async (variables: {
    email: string;
    password: string;
  }) => {
    await signIn(variables.email, variables.password);
    navigate('/');
  };

  return (
    <SignInTemplate
      isLoading={isPending}
      error={error}
      onSubmit={handleSignInFormSubmit}
    />
  );
}
