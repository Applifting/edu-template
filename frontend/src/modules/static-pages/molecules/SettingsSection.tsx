import { type ReactNode } from 'react';
import { type FieldValues } from 'react-hook-form';

import {
  Box,
  Button,
  Flex,
  Heading,
  Paragraph,
  Stack,
} from '@frontend/shared/design-system';
import { Form, type FormProps } from '@frontend/shared/forms';

export type SettingsSectionProps<
  TFieldValues extends FieldValues = FieldValues,
> = {
  formProps: Omit<FormProps<TFieldValues>, 'children'>;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
};

export function SettingsSection<
  TFieldValues extends FieldValues = FieldValues,
>({
  formProps,
  title,
  description,
  children,
}: SettingsSectionProps<TFieldValues>) {
  return (
    <Form {...formProps}>
      <Flex direction={{ base: 'column', md: 'row' }} columnGap="2">
        <Box flex="1">
          <Heading>{title}</Heading>
          {description && <Paragraph>{description}</Paragraph>}
        </Box>
        <Stack flex="2" p="8" bg="white" borderRadius="md" boxShadow="base">
          {children}
          <Box textAlign="right">
            <Button type="submit">Save</Button>
          </Box>
        </Stack>
      </Flex>
    </Form>
  );
}
