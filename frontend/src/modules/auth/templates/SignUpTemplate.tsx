import { route } from '@frontend/route';
import { Box, Heading } from '@frontend/shared/design-system';
import {
  MainSection,
  RouterLink,
  TopNavigation,
} from '@frontend/shared/navigation';

import { SignUpForm } from '../organisms';

export type SignUpTemplateProps = {
  isLoading: boolean;
  error?: Error;
  onSubmit: (data: {
    email: string;
    password: string;
    userName: string;
    name: string;
    profileImage: File | null;
  }) => void;
};

export function SignUpTemplate({
  isLoading,
  error,
  onSubmit,
}: SignUpTemplateProps) {
  return (
    <>
      <TopNavigation />
      <MainSection>
        <Heading mb="4">Sign Up</Heading>

        <SignUpForm
          isLoading={isLoading}
          errorMessage={error?.message}
          onSubmit={onSubmit}
        >
          <Box>
            or <RouterLink to={route.signIn()}>Sign In</RouterLink>
          </Box>
        </SignUpForm>
      </MainSection>
    </>
  );
}
