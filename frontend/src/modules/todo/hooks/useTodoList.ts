import { useState } from 'react';

import { type TodoItem, type TodoItemId } from '../types';

export type TodoListFilter = 'all' | 'completed' | 'not-completed';

export function useTodoList() {
  const [{ items, filter }, setState] = useState<{
    items: Array<TodoItem>;
    filter: TodoListFilter;
  }>(() => ({
    items: INITIAL_ITEMS,
    filter: 'all',
  }));

  const addItem = (item: Omit<TodoItem, 'id'>) => {
    // TODO
  };

  const setItemIsCompleted = (id: TodoItemId, isCompleted: boolean) => {
    // TODO
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
