import { Table } from '@cloudscape-design/components';

import { todoListTableColumnDefinitions } from './config';
import TodoListHeader from './todo-list-header';
import { useDeleteTodoItem, useUpdateTodoItem } from '../../data-access/todos';
import useTodoListTable from '../../hooks/use-todo-list-table';
import type { TodoItemSchema } from '../../schema';

type TodoListTableProps = {
  items: readonly TodoItemSchema[];
  isLoading: boolean;
  isError: boolean;
};

const TodoListTable = ({ items, isLoading, isError }: TodoListTableProps) => {
  const updateTodoItem = useUpdateTodoItem();
  const deleteTodoItem = useDeleteTodoItem();

  const {
    todoItems,
    selectedTodoItems,
    setSelectedTodoItems,
    collectionProps,
    isStatusDropdownDisabled,
    setIsSortingEnabled,
  } = useTodoListTable(items);

  return (
    <Table<TodoItemSchema>
      {...collectionProps}
      resizableColumns
      selectionType='multi'
      columnDefinitions={todoListTableColumnDefinitions}
      items={todoItems}
      selectedItems={selectedTodoItems}
      loading={isLoading}
      empty={isError ? 'An error occurred while fetching todo items.' : 'No todo items found.'}
      header={
        <TodoListHeader
          selectedTodoItems={selectedTodoItems}
          setSelectedTodoItems={setSelectedTodoItems}
          isStatusDropdownDisabled={isStatusDropdownDisabled}
          onSave={async (data) => {
            setIsSortingEnabled(false); // Disable sorting
            await updateTodoItem.mutateAsync(data);
            setIsSortingEnabled(true); // Re-enable sorting
          }}
          onDelete={async (id) => {
            setIsSortingEnabled(false); // Disable sorting
            await deleteTodoItem.mutateAsync(id);
            setIsSortingEnabled(true); // Re-enable sorting
          }}
          onArchive={(id) => console.log('Archive', id)}
        />
      }
      submitEdit={async (item, column, newValue) => {
        setIsSortingEnabled(false); // Disable sorting
        await updateTodoItem.mutateAsync({ ...item, [column.id as string]: newValue });
        setIsSortingEnabled(true); // Re-enable sorting
      }}
      onSelectionChange={(event) => setSelectedTodoItems(event.detail.selectedItems)}
    />
  );
};

export default TodoListTable;
