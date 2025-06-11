import {
  createListCollection,
  RadioGroup,
  Select,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

import {
  BodyBackground,
  Heading,
  Paragraph,
} from '@frontend/shared/design-system/components';
import { InputField } from '@frontend/shared/forms/molecules/fields/InputField';
import { SwitchField } from '@frontend/shared/forms/molecules/fields/SwitchField';

import { SettingsSection } from '../molecules/SettingsSection';

const profileSchema = zod.object({ firstName: zod.string().min(1) });

const visibilityOptions = createListCollection({
  items: [
    { label: 'Public', value: 'public' },
    { label: 'Only friends', value: 'friends' },
    { label: 'Private', value: 'private' },
  ],
});

export function Practical03Page() {
  return (
    <>
      <BodyBackground bg="gray.100" />
      <Heading pb="4">Practical 03</Heading>

      <Stack>
        <SettingsSection
          title="Profile"
          description="This is your profile information."
          formProps={{
            resolver: zodResolver(profileSchema),
            defaultValues: {
              firstName: 'John',
              lastName: 'Doe',
              username: 'jdoe',
              email: 'john@doe.com',
              bio: 'Lorem ipsum',
              visibility: 'friends',
              agreeToc: true,
            },
            onSubmit: (data) => {
              alert(JSON.stringify(data, null, 2));
            },
          }}
        >
          <InputField name="firstName" label="First name" id="firstName" />
          <InputField name="bio" label="Profile bio" as={Textarea} id="bio" />
          <Select.Root collection={visibilityOptions}>
            <Select.HiddenSelect />
            <Select.Label>Visibility</Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select visibility" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Select.Positioner>
              <Select.Content>
                {visibilityOptions.items.map((option) => (
                  <Select.Item item={option} key={option.value}>
                    {option.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Select.Root>
          <SwitchField name="agreeToc">
            Agree to Terms and Conditions
          </SwitchField>
        </SettingsSection>
        <SettingsSection
          title="Notifications"
          description="Setup how much notification you will receive"
          formProps={{
            defaultValues: { notificationsLevel: 'mentions' },
            onSubmit: (data) => {
              alert(JSON.stringify(data, null, 2));
            },
          }}
        >
          <Heading as="h5">Notify me</Heading>
          <Paragraph>When you should be notified:</Paragraph>
          <RadioGroup.Root>
            <Stack>
              <RadioGroup.Item value="all">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>
                  Every time someone quacks
                </RadioGroup.ItemText>
              </RadioGroup.Item>

              <RadioGroup.Item value="mentions">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>
                  Only mentions (@username)
                </RadioGroup.ItemText>
              </RadioGroup.Item>

              <RadioGroup.Item value="never">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>Never</RadioGroup.ItemText>
              </RadioGroup.Item>
            </Stack>
          </RadioGroup.Root>
        </SettingsSection>
      </Stack>
    </>
  );
}
