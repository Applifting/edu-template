import { useState } from 'react';
import { Box, Button, Stack } from '@chakra-ui/react';

import { Heading, Paragraph } from '@frontend/shared/design-system/components';

export function Practical01Page() {
  const [counter, setCounter] = useState(0);

  return (
    <Box>
      <Heading>Practical 01</Heading>
      <Paragraph mb={3}>Counter: {counter}</Paragraph>
      <Stack direction="row">
        <Button colorPalette="red" onClick={() => setCounter(counter - 1)}>
          -1
        </Button>
        <Button colorPalette="blue" onClick={() => setCounter(0)}>
          Reset
        </Button>
        <Button colorPalette="green" onClick={() => setCounter(counter + 1)}>
          +1
        </Button>
      </Stack>
    </Box>
  );
}
