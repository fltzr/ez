import { isEmpty } from 'lodash-es';
import { Header, SpaceBetween, Button, ButtonDropdown } from '@cloudscape-design/components';

import type { TodoItemSchema } from '../../schema';

type TodoListHeaderProps = {
  selectedTodoItems: TodoItemSchema[];
  setSelectedTodoItems: (items: TodoItemSchema[]) => void;
  isStatusDropdownDisabled: () => boolean;
  onSave: (data: Partial<TodoItemSchema>) => void;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
};

const TodoListHeader = ({
  selectedTodoItems,
  setSelectedTodoItems,
  isStatusDropdownDisabled,
  onSave,
  onDelete,
}: TodoListHeaderProps) => (
  <Header
    variant='h2'
    actions={
      <SpaceBetween size='s' direction='horizontal'>
        <ButtonDropdown
          disabled={isStatusDropdownDisabled()}
          items={[
            {
              id: 'mark-completed',
              text: 'Mark completed',
              disabled: selectedTodoItems[0]?.status === 'success',
            },
            {
              id: 'mark-in-progress',
              text: 'Mark in-progress',
              disabled: selectedTodoItems[0]?.status === 'in-progress',
            },
          ]}
          onItemClick={(event) => {
            const status = event.detail.id === 'mark-completed' ? 'success' : 'in-progress';
            onSave({ ...selectedTodoItems[0], status });
            setSelectedTodoItems([]);
          }}
        >
          Mark status
        </ButtonDropdown>
        <Button
          disabled={isEmpty(selectedTodoItems)}
          onClick={(event) => {
            event.preventDefault();
            onDelete(selectedTodoItems[0].id);
            setSelectedTodoItems([]);
          }}
        >
          Delete
        </Button>
        <Button
          variant='primary'
          disabled={isEmpty(selectedTodoItems) || selectedTodoItems[0].status === 'success'}
          onClick={(event) => {
            event.preventDefault();
            onSave({ ...selectedTodoItems[0], status: 'success' });
            setSelectedTodoItems([]);
          }}
        >
          Mark completed
        </Button>
      </SpaceBetween>
    }
  >
    Todo Items
  </Header>
);

export default TodoListHeader;
