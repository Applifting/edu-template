import { type ReactNode } from 'react';

import { route } from '@frontend/route';
import { Button, ErrorBanner, Stack } from '@frontend/shared/design-system';
import {
  CheckboxField,
  Form,
  InputField,
  SingleFileUploadField,
  zod,
  zodResolver,
} from '@frontend/shared/forms';
import { RouterLink } from '@frontend/shared/navigation';

const schema = zod
  .object({
    email: zod
      .string()
      .trim()
      .min(1, 'Email is required')
      .email('Invalid email'),
    name: zod.string().trim().min(1, 'Name is required'),
    password: zod.string().trim().min(1, 'Password is required'),
    passwordConfirmation: zod
      .string()
      .trim()
      .min(1, 'Password confirmation is required'),
    username: zod.string().trim().min(1, 'Username is required'),
    profileImage: zod.instanceof(File).nullable(),
    terms: zod.literal<boolean>(true, {
      errorMap: () => ({ message: 'You must accept the terms and conditions' }),
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords must match',
    path: ['passwordConfirmation'],
  });

type FormValues = zod.infer<typeof schema>;

const initialValues: FormValues = {
  email: '',
  name: '',
  password: '',
  passwordConfirmation: '',
  username: '',
  profileImage: null,
  terms: false,
};

export type SignUpFormProps = {
  isLoading: boolean;
  errorMessage?: string;
  onSubmit: (data: {
    email: string;
    password: string;
    name: string;
    username: string;
    profileImage: File | null;
  }) => void;
  children?: ReactNode;
};

export function SignUpForm({
  isLoading,
  errorMessage,
  onSubmit,
  children,
}: SignUpFormProps) {
  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={initialValues}
      // todo: fix type error
      resolver={zodResolver(schema as any)}
      noValidate
    >
      <Stack spacing="3" py="4">
        {errorMessage && <ErrorBanner title={errorMessage} />}
        <InputField
          name="name"
          label="Name"
          type="text"
          isRequired
          autoFocus
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <InputField
          name="username"
          label="Username"
          type="text"
          isRequired
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <InputField
          name="email"
          label="Email"
          type="email"
          isRequired
          placeholder="e.g. john@doe.com"
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
        <InputField
          name="passwordConfirmation"
          label="Password Confirmation"
          type="password"
          isRequired
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <SingleFileUploadField
          name="profileImage"
          label="Profile Image"
          accept="image/*"
        />
        <CheckboxField
          name="terms"
          label={
            <>
              I agree with the{' '}
              <RouterLink to={route.terms()}>terms and conditions</RouterLink>
            </>
          }
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
        Sign Up
      </Button>
      {children}
    </Form>
  );
}
