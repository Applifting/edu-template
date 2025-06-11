import { useState } from 'react';
import {
  Box,
  Button,
  Center,
  Checkbox,
  IconButton,
  Input,
  Stack,
  Tabs,
} from '@chakra-ui/react';
import { FaTrash as DeleteIcon } from 'react-icons/fa';

import { useTodoList } from '@frontend/modules/todo/hooks/useTodoList';
import { Heading } from '@frontend/shared/design-system/components';

const STATES = ['all', 'completed', 'not-completed'] as const;

export function Practical02Page() {
  const {
    items,
    addItem,
    setItemIsCompleted,
    removeItem,
    activeFilter,
    setActiveFilter,
  } = useTodoList();

  const [inputValue, setInputValue] = useState('');

  return (
    <Box>
      <Heading>Practical 02</Heading>
      <Stack
        as="form"
        direction="row"
        onSubmit={(event) => {
          event.preventDefault();

          addItem({ description: inputValue, isCompleted: false });

          setInputValue('');
        }}
      >
        <Input
          type="text"
          placeholder="What shell to be done?"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <Button type="submit" colorPalette="green">
          Add
        </Button>
      </Stack>
      <Tabs.Root
        value={activeFilter}
        onValueChange={(e) =>
          setActiveFilter(e.value as (typeof STATES)[number])
        }
      >
        <Tabs.List>
          <Tabs.Trigger value={STATES[0]}>All</Tabs.Trigger>
          <Tabs.Trigger value={STATES[1]}>Completed</Tabs.Trigger>
          <Tabs.Trigger value={STATES[2]}>Not completed</Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
      <Stack
        borderColor="gray.300"
        borderWidth="1px"
        mt="4"
        borderRadius="md"
        overflow="hidden"
      >
        {items.length === 0 ? (
          <Center p="4" bg="gray.100" color="gray.600">
            No items {activeFilter !== 'all' ? 'for selected filter' : null}
          </Center>
        ) : null}
        {items.map((item) => (
          <Stack
            key={item.id}
            as="label"
            direction="row"
            alignItems="center"
            role="group"
            py="1"
            px="2"
            _hover={{ bg: 'gray.100' }}
            css={{
              '&:hover .delete-button': {
                visibility: 'visible',
              },
            }}
          >
            <Checkbox.Root
              checked={!!item.isCompleted}
              colorPalette="blue"
              onCheckedChange={({ checked }) =>
                // TODO: !!checked is a weird solution, it doesn't consider the indeterminate state
                setItemIsCompleted(item.id, !!checked)
              }
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
            </Checkbox.Root>
            <Box
              flex="1"
              color={item.isCompleted ? 'gray.500' : undefined}
              textDecoration={item.isCompleted ? 'line-through' : 'none'}
            >
              {item.description}
            </Box>
            <IconButton
              className="delete-button"
              aria-label="Delete"
              size="sm"
              onClick={() => removeItem(item.id)}
              visibility="hidden"
              colorPalette="red"
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
