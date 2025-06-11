import { type ReactNode } from 'react';
import { Box, Button, Flex, Stack } from '@chakra-ui/react';
import { type FieldValues } from 'react-hook-form';

import { Heading, Paragraph } from '@frontend/shared/design-system/components';
import { Form, FormProps } from '@frontend/shared/forms/molecules/Form';

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
