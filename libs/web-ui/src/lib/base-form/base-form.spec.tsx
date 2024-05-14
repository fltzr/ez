import '@testing-library/jest-dom';
import React, { createRef, useRef } from 'react';
import { z } from 'zod';
import { SubmitHandler } from 'react-hook-form';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BaseForm } from './base-form';
import { FormInput } from '../form-input/form-input';
import { Button } from '@cloudscape-design/components';

const testSchema = z.object({
  name: z.string({ message: 'Name is required.' }).min(1, { message: 'Name is required.' }),
});

type TestSchema = z.infer<typeof testSchema>;

const TestComponent = ({ handleSubmit }: { handleSubmit: SubmitHandler<TestSchema> }) => {
  const formRef = useRef<{ reset: () => void }>(null);

  return (
    <BaseForm
      formRef={formRef}
      formId='form_test-component'
      zodSchema={testSchema}
      onSubmit={handleSubmit}
    >
      <FormInput name='name' label='Name' />
      <Button form='form_test-component' formAction='submit'>
        Submit
      </Button>
    </BaseForm>
  );
};

test('renders the form and submits with valid data', async () => {
  const handleSubmit = vi.fn();
  render(<TestComponent handleSubmit={handleSubmit} />);

  fireEvent.change(screen.getByLabelText(/Name/i), {
    target: { value: 'Test' },
  });

  fireEvent.click(screen.getByText(/Submit/i));

  await waitFor(() => {
    expect(screen.queryByText(/Name is required./i)).not.toBeInTheDocument();
    expect(handleSubmit).toHaveBeenCalledWith({ name: 'Test' }, expect.any(Object));
  });
});

test('displays valdidation errors on invalid submission', async () => {
  const handleSubmit = vi.fn();
  render(<TestComponent handleSubmit={handleSubmit} />);

  fireEvent.click(screen.getByText(/Submit/i));

  await waitFor(() => {
    expect(screen.queryByText(/Name is required./i)).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});

test('resets the form when calling formRef', async () => {
  const handleSubmit = vi.fn();
  const formRef = createRef<{ reset: () => void }>();
  render(<TestComponent handleSubmit={handleSubmit} />);

  fireEvent.change(screen.getByLabelText(/Name/i), {
    target: { value: 'Test' },
  });

  fireEvent.click(screen.getByText(/Submit/i));

  await waitFor(() => {
    expect(screen.queryByText(/Name is required./i)).not.toBeInTheDocument();
  });

  if (formRef.current) {
    formRef.current.reset();
  }

  await waitFor(() => {
    expect(screen.getByLabelText(/Name/i)).toHaveValue('');
  });
});
