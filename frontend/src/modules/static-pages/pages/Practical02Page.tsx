import { useState } from 'react';

import { useTodoList } from '@frontend/modules/todo/hooks/useTodoList';
import {
  Box,
  Button,
  Center,
  Checkbox,
  DeleteIcon,
  Heading,
  IconButton,
  Input,
  Stack,
  Tab,
  TabList,
  Tabs,
} from '@frontend/shared/design-system';

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
        <Button type="submit" colorScheme="green">
          Add
        </Button>
      </Stack>
      <Tabs
        index={STATES.indexOf(activeFilter)}
        onChange={(index) => setActiveFilter(STATES[index])}
        variant="soft-rounded"
        colorScheme="blue"
        my="4"
      >
        <TabList>
          <Tab>All</Tab>
          <Tab>Completed</Tab>
          <Tab>Not completed</Tab>
        </TabList>
      </Tabs>
      <Stack
        borderColor="gray.300"
        borderWidth="1px"
        mt="4"
        spacing="0"
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
          >
            <Checkbox
              isChecked={item.isCompleted}
              onChange={(event) =>
                setItemIsCompleted(item.id, event.target.checked)
              }
            />
            <Box
              flex="1"
              color={item.isCompleted ? 'gray.500' : undefined}
              textDecoration={item.isCompleted ? 'line-through' : 'none'}
            >
              {item.description}
            </Box>
            <IconButton
              icon={<DeleteIcon />}
              aria-label="Delete"
              colorScheme="red"
              size="sm"
              onClick={() => removeItem(item.id)}
              visibility="hidden"
              _groupHover={{ visibility: 'visible' }}
            />
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
