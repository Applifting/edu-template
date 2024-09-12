import {
  Box,
  Button,
  Heading,
  Paragraph,
} from '@frontend/shared/design-system';

export function Practical01Page() {
  return (
    <Box>
      <Heading>Practical 01</Heading>
      <Paragraph>Hello!</Paragraph>
      <Button onClick={() => alert('Button Pressed!')}>Press Me</Button>
    </Box>
  );
}
