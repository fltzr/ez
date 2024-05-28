import { useRef } from 'react';
import { Drawer } from '@cloudscape-design/components';

import { BaseForm } from '@ez/web-ui';
import { CreateTodoItemContent } from './create-todo-item-content';
import type { TodoItemSchema } from '../schema';
import { todoItemSchema } from '../schema';

type CreateTodoItemPanelProps = {
  onSave: (newItem: Omit<TodoItemSchema, 'id'>) => void;
};

export const CreateTodoItemPanel = ({ onSave }: CreateTodoItemPanelProps) => {
  const formRef = useRef<{ reset: () => void }>(null);

  const handleOnSave = (data: TodoItemSchema) => {
    console.log(`Saving todo item: ${JSON.stringify(data, null, 2)}`);
    onSave(data);
    formRef.current?.reset();
  };

  const handleOnError = (error: unknown) => {
    console.log(`Error: ${JSON.stringify(error, null, 2)}`);
  };

  return (
    <Drawer header='Add a todo item'>
      <BaseForm
        formId='form__create-todo-item'
        formRef={formRef}
        zodSchema={todoItemSchema}
        onSubmit={handleOnSave}
        onError={handleOnError}
      >
        <CreateTodoItemContent />
      </BaseForm>
    </Drawer>
  );
};
