import { type ReactNode, type Ref, useImperativeHandle, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { type FormProps, Form } from '@cloudscape-design/components';
import {
  type FieldValues,
  type SubmitHandler,
  type DefaultValues,
  FormProvider,
  useForm,
} from 'react-hook-form';
import type { SubmitErrorHandler } from 'react-hook-form';

type BaseFormProps<TFormValues extends FieldValues> = {
  formId: string;
  testId?: string;
  zodSchema: z.ZodSchema;
  defaultValues?: DefaultValues<TFormValues>;
  onSubmit: SubmitHandler<TFormValues>;
  onError: SubmitErrorHandler<TFormValues>;
  children: ReactNode;
  formRef: Ref<{ reset: () => void }>;
} & Omit<FormProps, 'children' | 'className' | 'id'>;

export const BaseForm = <TFormValues extends FieldValues>({
  formId,
  testId,
  zodSchema,
  defaultValues,
  onSubmit,
  onError,
  children,
  formRef,
  ...formProps
}: BaseFormProps<TFormValues>) => {
  const hasSubmittedOnce = useRef(false);

  const methods = useForm<TFormValues>({
    resolver: zodResolver(zodSchema),
    defaultValues,
    mode: hasSubmittedOnce.current ? 'onChange' : 'onSubmit',
  });

  useImperativeHandle(formRef, () => ({
    reset: () => {
      methods.reset();
    },
  }));

  return (
    <FormProvider {...methods}>
      <form
        id={formId}
        data-testid={testId ? `base-form_${testId}` : 'base-form'}
        onSubmit={(event) => {
          event.preventDefault();
          hasSubmittedOnce.current = true;
          methods.handleSubmit(onSubmit, onError)(event);
        }}
      >
        <Form {...formProps}>{children}</Form>
      </form>
    </FormProvider>
  );
};
