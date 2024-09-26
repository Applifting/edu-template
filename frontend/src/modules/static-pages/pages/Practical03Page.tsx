import {
  BodyBackground,
  Heading,
  Paragraph,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
  Textarea,
} from '@frontend/shared/design-system';
import { InputField } from '@frontend/shared/forms';

import { SettingsSection } from '../molecules';

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
          <InputField name="firstName" label="First name" />
          <InputField name="about" label="Profile bio" as={Textarea} />
          <Select>
            <option value="public">Public</option>
            <option value="friends">Only friends</option>
            <option value="private">Private</option>
          </Select>
          <Switch> Agree to Terms and Conditions</Switch>
        </SettingsSection>
        <SettingsSection
          title="Notifications"
          description="Setup how much notification you will receive"
          formProps={{
            defaultValues: {
              notificationsLevel: 'mentions',
            },
            onSubmit: (data) => {
              alert(JSON.stringify(data, null, 2));
            },
          }}
        >
          <RadioGroup>
            <Heading as="h5">Notify me</Heading>
            <Paragraph>When you should be notified:</Paragraph>
            <Stack>
              <Radio value="all">Every time someone quacks</Radio>
              <Radio value="mentions">Only mentions (@username)</Radio>
              <Radio value="never">Never</Radio>
            </Stack>
          </RadioGroup>
        </SettingsSection>
      </Stack>
    </>
  );
}
