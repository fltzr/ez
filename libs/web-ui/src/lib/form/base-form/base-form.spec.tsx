import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { z } from 'zod';
import { useFormContext } from 'react-hook-form';
import { BaseForm } from './base-form';

const schema = z.object({
  name: z.string().min(1, 'Name is required.'),
});

const MockInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <input {...register('name')} placeholder='Name' />
      {errors.name && <span>{errors.name?.message?.toString()}</span>}
    </>
  );
};

describe('BaseForm', () => {
  it('renders children and submits form with internal submit button', async () => {
    const formRef = { current: null };
    const handleSubmit = vi.fn();

    render(
      <BaseForm formId='form' formRef={formRef} zodSchema={schema} onSubmit={handleSubmit}>
        <MockInput />
        <button type='submit'>Submit</button>
      </BaseForm>
    );

    fireEvent.change(screen.getByPlaceholderText(/Name/i), { target: { value: 'Test' } });

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({ name: 'Test' }, expect.anything());
    });
  });

  it('renders children and submits form with external submit button', async () => {
    const formRef = { current: null };
    const handleSubmit = vi.fn();

    render(
      <>
        <BaseForm formId='form_test' formRef={formRef} zodSchema={schema} onSubmit={handleSubmit}>
          <MockInput />
        </BaseForm>
        <button type='submit' form='form_test'>
          Submit
        </button>
      </>
    );

    fireEvent.change(screen.getByPlaceholderText(/Name/i), { target: { value: 'Test' } });
    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({ name: 'Test' }, expect.anything());
    });
  });

  it('shows validation error on invalid submission', async () => {
    const handleSubmit = vi.fn();
    const formRef = { current: null };

    render(
      <BaseForm formId='form_test' formRef={formRef} zodSchema={schema} onSubmit={handleSubmit}>
        <MockInput />
        <button type='submit'>Submit</button>
      </BaseForm>
    );

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(screen.getByText(/Name is required./i)).toBeInTheDocument();
    });

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('resets the form when calling reset', async () => {
    const handleSubmit = vi.fn();
    const formRef = { current: { reset: vi.fn() } };

    render(
      <BaseForm formId='form_test' formRef={formRef} zodSchema={schema} onSubmit={handleSubmit}>
        <MockInput />
        <button type='submit'>Submit</button>
      </BaseForm>
    );

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({ name: 'Test' }, expect.anything());
    });

    formRef.current?.reset();

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Name/i)).toBeEmptyDOMElement();
    });
  });
});
