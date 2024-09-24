import { useState } from 'react';

import {
  Box,
  Button,
  Heading,
  Paragraph,
  Stack,
} from '@frontend/shared/design-system';

export function Practical01Page() {
  const [counter, setCounter] = useState(0);

  return (
    <Box>
      <Heading>Practical 01</Heading>
      <Paragraph>Counter: {counter}</Paragraph>
      <Stack direction="row">
        <Button colorScheme="red" onClick={() => setCounter(counter - 1)}>
          -1
        </Button>
        <Button colorScheme="blue" onClick={() => setCounter(0)}>
          Reset
        </Button>
        <Button colorScheme="green" onClick={() => setCounter(counter + 1)}>
          +1
        </Button>
      </Stack>
    </Box>
  );
}
