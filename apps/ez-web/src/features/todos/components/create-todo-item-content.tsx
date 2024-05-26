import { DateTime } from 'luxon';
import { Box, Button, SpaceBetween } from '@cloudscape-design/components';
import { useFormContext } from 'react-hook-form';

import { FormDatePicker, FormInput } from '@ez/web-ui';
import type { TodoItemSchema } from '../schema';

export const CreateTodoItemContent = () => {
  const { control } = useFormContext<TodoItemSchema>();

  return (
    <SpaceBetween direction='vertical' size='m'>
      <FormInput control={control} name='title' label='Title' />
      <FormInput control={control} name='description' label='Description' />
      <FormDatePicker
        control={control}
        name='dueDate'
        label='Due date'
        placeholder={DateTime.now().toFormat('yyyy-MM-dd')}
        constraintText={`This property will default to today's date. (${DateTime.now().toFormat('yyyy-MM-dd')})`}
      />
      <Box float='right' margin={{ top: 'xxxl' }}>
        <Button variant='primary' form='form__create-todo-item'>
          Add
        </Button>
      </Box>
    </SpaceBetween>
  );
};
