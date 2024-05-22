// import React, { useState } from 'react';
// import { Box, Button, Form, FormField, Input } from '@cloudscape-design/components';
// import { TodoItemSchema } from './todo-list-table';
// import { nanoid } from 'nanoid';

import { useRef } from 'react';
import { type TodoItemSchema, todoItemSchema } from './todo-list-table';
import { Drawer } from '@cloudscape-design/components';
import { BaseForm } from '@ez/web-ui';
import { CreateTodoItemContent } from './create-todo-item-content';

// interface CreateTodoItemPanelProps {
//   onSave: (newItem: TodoItemSchema) => void;
// }

// export const CreateTodoItemPanel: React.FC<CreateTodoItemPanelProps> = ({ onSave }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');

//   const handleSave = () => {
//     const newItem: TodoItemSchema = {
//       id: nanoid(5),
//       title,
//       description,
//       status: 'in-progress',
//     };
//     onSave(newItem);
//     setTitle('');
//     setDescription('');
//   };

//   return (
//     <Box padding='l'>
//       <Form
//         actions={
//           <Button variant='primary' onClick={handleSave}>
//             Create
//           </Button>
//         }
//       >
//         <FormField label='Title'>
//           <Input value={title} onChange={(e) => setTitle(e.detail.value)} />
//         </FormField>
//         <FormField label='Description'>
//           <Input value={description} onChange={(e) => setDescription(e.detail.value)} />
//         </FormField>
//       </Form>
//     </Box>
//   );
// };

type CreateTodoItemPanelProps = {
  onSave: (newItem: TodoItemSchema) => void;
};

export const CreateTodoItemPanel = ({ onSave }: CreateTodoItemPanelProps) => {
  const formRef = useRef<{ reset: () => void }>(null);

  const handleOnSave = (data: TodoItemSchema) => {
    console.log(data);
    onSave(data);
    formRef.current?.reset();
  };

  const handleOnError = (error) => {
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
