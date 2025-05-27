import { type ReactNode } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

import { Button, ErrorBanner, Stack } from '@frontend/shared/design-system';
import { InputField } from '@frontend/shared/forms/molecules/fields/InputField';
import { Form } from '@frontend/shared/forms/molecules/Form';

const schema = zod.object({
  email: zod.string().trim().min(1, 'Email is required').email('Invalid email'),
  password: zod.string().trim().min(1, 'Password is required'),
});

type FormValues = zod.infer<typeof schema>;

const initialValues: FormValues = { email: '', password: '' };

export type SingInFormProps = {
  children?: ReactNode;
  isLoading: boolean;
  errorMessage?: string;
  onSubmit: (data: { email: string; password: string }) => void;
};

export function SignInForm({
  isLoading,
  errorMessage,
  onSubmit,
  children,
}: SingInFormProps) {
  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={initialValues}
      resolver={zodResolver(schema)}
      noValidate
    >
      <Stack spacing="3" py="4">
        {errorMessage && <ErrorBanner title={errorMessage} />}
        <InputField
          name="email"
          label="Email"
          type="email"
          placeholder="e.g. john@doe.com"
          isRequired
          autoFocus
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          isRequired
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </Stack>
      <Button
        size="lg"
        type="submit"
        isLoading={isLoading}
        colorScheme="green"
        mt="4"
        mb="2"
      >
        Sign In
      </Button>
      {children}
    </Form>
  );
}
