import { useState } from 'react';

import { type TodoItem, type TodoItemId } from '../types';

export type TodoListFilter = 'all' | 'completed' | 'not-completed';

export function useTodoList() {
  const [{ items, activeFilter }, setState] = useState<{
    items: Array<TodoItem>;
    activeFilter: TodoListFilter;
    nextId: number;
  }>(INITIAL_STATE);

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
    setState((prevState) => ({
      ...prevState,
      items: prevState.items.filter((item) => {
        if (item.id === id) return false;
        return true;
      }),
    }));
  };

  const setActiveFilter = (activeFilter: TodoListFilter) => {
    setState((prevState) => ({
      ...prevState,
      activeFilter,
    }));
  };

  const filteredItems =
    activeFilter === 'all'
      ? items
      : items.filter((item) => {
          switch (activeFilter) {
            case 'completed':
              return item.isCompleted === true;
            case 'not-completed':
              return item.isCompleted !== true;
            default:
              return true;
          }
        });

  return {
    items: filteredItems,
    addItem,
    setItemIsCompleted,
    removeItem,
    activeFilter,
    setActiveFilter,
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

const INITIAL_STATE = {
  items: INITIAL_ITEMS,
  nextId: Math.max(...INITIAL_ITEMS.map(({ id }) => id)) + 1,
  activeFilter: 'all',
} as const;
