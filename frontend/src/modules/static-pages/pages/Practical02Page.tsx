import { useState } from 'react';

import { useTodoList } from '@frontend/modules/todo/hooks';
import {
  Box,
  Button,
  Checkbox,
  Heading,
  Input,
  Stack,
} from '@frontend/shared/design-system';

export function Practical02Page() {
  const { items, addItem, setItemIsCompleted, removeItem, filter, setFilter } =
    useTodoList();

  const [inputValue, setInputValue] = useState('');

  return (
    <Box>
      <Heading>Practical 02</Heading>
      <Stack
        as="form"
        direction="row"
        onSubmit={(event) => {
          event.preventDefault();

          addItem({
            description: inputValue,
            isCompleted: false,
          });

          setInputValue('');
        }}
      >
        <Input
          type="text"
          placeholder="What shell to be done?"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <Button type="submit" colorScheme="green">
          Add
        </Button>
      </Stack>
      <Stack
        borderColor="gray.300"
        borderWidth="1px"
        mt="4"
        spacing="0"
        borderRadius="md"
      >
        {items.map((item) => (
          <Box
            key={item.id}
            p="3"
            _hover={{
              bg: 'gray.100',
            }}
          >
            <Stack as="label" direction="row">
              <Checkbox
                isChecked={item.isCompleted}
                onChange={(event) =>
                  setItemIsCompleted(item.id, event.target.checked)
                }
              />
              <Box>{item.description}</Box>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
