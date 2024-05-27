import { nanoid } from 'nanoid';
import { useLocalStorage } from '../../../common/hooks/use-local-storage';
import type { TodoItemSchema } from '../schema';
import { DateTime } from 'luxon';

const getInitialItems = (): TodoItemSchema[] => [
  {
    id: nanoid(5),
    title: 'Learn React',
    description: 'Learn React and build a todo app',
    status: 'in-progress',
    dueDate: DateTime.now().toFormat('yyyy-MM-dd'),
  },
  {
    id: nanoid(5),
    title: 'Completed task',
    description: 'This task is already completed',
    status: 'success',
    dueDate: DateTime.now().toFormat('yyyy-MM-dd'),
  },
];

export const useTodoItems = () => {
  const [todoItems, setTodoItems] = useLocalStorage<TodoItemSchema[]>({
    localstorageKey: 'internal__todo-items',
    initialValue: getInitialItems(),
  });

  const [archivedTodoItems, setArchivedTodoItems] = useLocalStorage<TodoItemSchema[]>({
    localstorageKey: 'internal__archived-todo-items',
    initialValue: [],
  });

  const addTodoItem = (item: TodoItemSchema) => {
    setTodoItems([...todoItems, item]);
  };

  const updateTodoItem = (data: Partial<TodoItemSchema>) => {
    console.log(data);
    if (!data.id) {
      console.error('No ID provided for todo item.');
      return;
    }

    const index = todoItems.findIndex((item) => item.id === data.id);

    if (index === -1) {
      console.error('No todo item found with provided ID.');
      return;
    }

    const updatedItems = [...todoItems];
    updatedItems[index] = { ...todoItems[index], ...data };

    setTodoItems(updatedItems);
  };

  const deleteTodoItem = (id: string) => {
    const updatedItems = todoItems.filter((item) => item.id !== id);
    setTodoItems(updatedItems);
  };

  const archiveTodoItem = (id: string) => {
    if (!id) {
      console.error('No ID provided for todo item.');
      return;
    }

    // Remove the item from the todo list
    const updatedItems = todoItems.filter((item) => item.id !== id);

    // Find the item to archive
    const itemToArchive = todoItems.find((item) => item.id === id);

    if (!itemToArchive) {
      console.error('No todo item found with provided ID.');
      return;
    }

    // Add the item to the archived list
    setTodoItems(updatedItems);
    setArchivedTodoItems([...archivedTodoItems, itemToArchive]);
  };

  const restoreTodoItem = (id: string) => {
    if (!id) {
      console.error('No ID provided for todo item.');
      return;
    }

    // Remove the item from the archived list
    const updatedItems = archivedTodoItems.filter((item) => item.id !== id);

    // Find the item to restore
    const itemToRestore = archivedTodoItems.find((item) => item.id === id);

    if (!itemToRestore) {
      console.error('No todo item found with provided ID.');
      return;
    }

    // Add the item to the todo list
    setArchivedTodoItems(updatedItems);
    setTodoItems([...todoItems, itemToRestore]);
  };

  return {
    todoItems,
    archivedTodoItems,
    addTodoItem,
    updateTodoItem,
    deleteTodoItem,
    archiveTodoItem,
    restoreTodoItem,
  };
};
