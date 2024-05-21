import React, { useState } from 'react';
import { Box, Button, Form, FormField, Input } from '@cloudscape-design/components';
import { TodoItemSchema } from './todo-list-table';
import { nanoid } from 'nanoid';

interface CreateTodoItemPanelProps {
  onSave: (newItem: TodoItemSchema) => void;
}

export const CreateTodoItemPanel: React.FC<CreateTodoItemPanelProps> = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    const newItem: TodoItemSchema = {
      id: nanoid(5),
      title,
      description,
      status: 'in-progress',
    };
    onSave(newItem);
    setTitle('');
    setDescription('');
  };

  return (
    <Box padding='l'>
      <Form
        actions={
          <Button variant='primary' onClick={handleSave}>
            Create
          </Button>
        }
      >
        <FormField label='Title'>
          <Input value={title} onChange={(e) => setTitle(e.detail.value)} />
        </FormField>
        <FormField label='Description'>
          <Input value={description} onChange={(e) => setDescription(e.detail.value)} />
        </FormField>
      </Form>
    </Box>
  );
};
