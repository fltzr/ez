'https://chat.openai.com/share/77596c70-79fb-47a4-a798-5f0801ddf09a';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInput } from './form-input';
import { render, act, fireEvent, screen, waitFor } from '@testing-library/react';
import createWrapper from '@cloudscape-design/components/test-utils/dom';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required.'),
});

const wrapper = createWrapper();

describe('FormInput', () => {
  it('renders input and allows typing', async () => {
    const Wrapper = () => {
      const methods = useForm();
      return (
        <FormProvider {...methods}>
          <FormInput name='testInput' control={methods.control} />
        </FormProvider>
      );
    };

    render(<Wrapper />);

    const input = wrapper.findInput('[data-testid="form-input"]');

    await act(async () => {
      input?.setInputValue('test');
    });

    expect(input?.getInputValue()).toBe('test');
  });

  it('displays validation error', async () => {
    const Wrapper = () => {
      const methods = useForm({ resolver: zodResolver(schema) });
      return (
        <FormProvider {...methods}>
          <form>
            <FormInput name='name' label='Name' control={methods.control} />
            <button data-testid='submit_button' type='submit'>
              Submit
            </button>
          </form>
        </FormProvider>
      );
    };

    render(<Wrapper />);

    const submitButton = screen.getByTestId('submit_button');
    const input = wrapper.findInput('[data-testid="form-input"]');
    input?.blur();

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(
        screen.getByText((content, element) => element?.textContent === 'Name is required.')
      ).toBeInTheDocument();
    });
  });
});
