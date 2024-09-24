import { useState } from 'react';

import { type TodoItem, type TodoItemId } from '../types';

export type TodoListFilter = 'all' | 'completed' | 'not-completed';

export function useTodoList() {
  const [{ items, filter }, setState] = useState<{
    items: Array<TodoItem>;
    filter: TodoListFilter;
    nextId: number;
  }>(() => ({
    items: INITIAL_ITEMS,
    filter: 'all',
    nextId: 4,
  }));

  const addItem = (item: Omit<TodoItem, 'id'>) => {
    setState((prevState) => ({
      ...prevState,
      items: [{ ...item, id: prevState.nextId }, ...prevState.items],
      nextId: prevState.nextId + 1,
    }));
  };

  const setItemIsCompleted = (id: TodoItemId, isCompleted: boolean) => {
    setState((prevState) => ({
      ...prevState,
      items: prevState.items.map((item) => {
        if (item.id === id) {
          return { ...item, isCompleted };
        }
        return item;
      }),
    }));
  };

  const removeItem = (id: TodoItemId) => {
    // TODO
  };

  const setFilter = (filter: TodoListFilter) => {
    // TODO
  };

  return {
    items,
    addItem,
    setItemIsCompleted,
    removeItem,
    filter,
    setFilter,
  };
}

const INITIAL_ITEMS: Array<TodoItem> = [
  {
    id: 1,
    description: 'go grocery shopping',
    isCompleted: true,
  },
  {
    id: 2,
    description: 'wash the dishes',
    isCompleted: true,
  },
  {
    id: 3,
    description: 'write some React code',
    isCompleted: false,
  },
];
