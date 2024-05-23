import { Box, Button, SpaceBetween } from '@cloudscape-design/components';
import { useFormContext } from 'react-hook-form';

import { FormInput } from '@ez/web-ui';
import type { TodoItemSchema } from './todo-list-table';

export const CreateTodoItemContent = () => {
  const { control } = useFormContext<TodoItemSchema>();

  return (
    <SpaceBetween direction='vertical' size='m'>
      <FormInput control={control} name='title' label='Title' />
      <FormInput control={control} name='description' label='Description' />
      <Box float='right'>
        <Button variant='primary' form='form__create-todo-item'>
          Add
        </Button>
      </Box>
    </SpaceBetween>
  );
};
