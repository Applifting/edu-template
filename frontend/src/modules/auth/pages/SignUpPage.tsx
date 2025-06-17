import { useNavigate } from 'react-router';

import { SignUpTemplate } from '../templates/SignUpTemplate';
import { useAuth } from '../use-auth.hook';

export function SignUpPage() {
  const navigate = useNavigate();
  const { signUp, isPending, error } = useAuth();

  const handleSignUpFormSubmit = async (variables: {
    email: string;
    name: string;
    username: string;
    password: string;
    profileImage: File | null;
  }) => {
    try {
      await signUp(
        variables.email,
        variables.password,
        variables.name,
        variables.username,
        variables.profileImage,
      );

      navigate('/');
    } catch (err) {
      console.error('Error during sign up:', err);
    }
  };

  return (
    <SignUpTemplate
      isLoading={isPending}
      error={error}
      onSubmit={handleSignUpFormSubmit}
    />
  );
}
