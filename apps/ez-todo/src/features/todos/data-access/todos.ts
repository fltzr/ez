import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '../../../common/utils/supabase-client';
import type { TodoItemSchema } from '../schema';
import { toNumber } from 'lodash-es';

/*
const data: null | {
    created_at: string;
    description: string | null;
    due_date: string;
    id: number;
    is_completed: boolean;
    title: string;
    updated_at: string | null;
    urg
*/

const fetchTodoItems = async () => {
  const { data, error } = await supabase.from('todo').select('*');

  if (error) {
    return [];
  }

  return data?.map((item) => ({
    id: item.id.toString(10),
    title: item.title,
    description: item.description,
    dueDate: item.due_date,
    status: item.is_completed ? 'success' : 'in-progress',
    urgency: item.urgency,
  })) as TodoItemSchema[];
};

const insertTodoItem = async (todo: Omit<TodoItemSchema, 'id'>) => {
  const newTodoItem = {
    title: todo.title,
    description: todo.description,
    due_date: todo.dueDate,
    is_completed: todo.status === 'success',
    urgency: todo.urgency,
  };

  const { data, error } = await supabase.from('todo').insert(newTodoItem);

  if (error) {
    throw new Error('Failed to insert todo item');
  }

  return data;
};

const updateTodoItem = async (todo: Partial<TodoItemSchema>) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const todoId = parseInt(todo.id!, 10);
  const updatedData = {
    title: todo.title,
    description: todo.description,
    due_date: todo.dueDate,
    is_completed: todo.status === 'success',
    urgency: todo.urgency,
  };

  const { data, error } = await supabase.from('todo').update(updatedData).eq('id', todoId);

  if (error) {
    throw new Error('Failed to update todo item');
  }

  return data;
};

const deleteTodoItem = async (todoId: string) => {
  const id = toNumber(todoId);

  const { data, error } = await supabase.from('todo').delete({ count: 'exact' }).eq('id', id);

  if (error) {
    throw new Error('Failed to delete todo item.');
  }

  return data;
};

export const useFetchTodoItems = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodoItems,
    refetchOnWindowFocus: false,
  });
};

export const useInsertTodoItem = () => {
  return useMutation({
    mutationFn: insertTodoItem,
    meta: { invalidates: [['todos']] },
  });
};

export const useUpdateTodoItem = () => {
  return useMutation({
    mutationFn: updateTodoItem,
    meta: { invalidates: [['todos']] },
  });
};

export const useDeleteTodoItem = () => {
  return useMutation({
    mutationFn: deleteTodoItem,
    meta: { invalidates: [['todos']] },
  });
};
