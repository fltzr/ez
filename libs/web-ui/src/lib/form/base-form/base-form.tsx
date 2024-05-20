import { type ReactNode, type Ref, useImperativeHandle } from 'react';
import {
  type FieldValues,
  type SubmitHandler,
  type DefaultValues,
  FormProvider,
  useForm,
} from 'react-hook-form';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { type FormProps, Form } from '@cloudscape-design/components';

type BaseFormProps<TFormValues extends FieldValues> = {
  formId: string;
  testId?: string;
  zodSchema: z.ZodSchema;
  defaultValues?: DefaultValues<TFormValues>;
  onSubmit: SubmitHandler<TFormValues>;
  children: ReactNode;
  formRef: Ref<{ reset: () => void }>;
} & Omit<FormProps, 'children' | 'className' | 'id'>;

export const BaseForm = <TFormValues extends FieldValues>({
  formId,
  testId,
  zodSchema,
  defaultValues,
  onSubmit,
  children,
  formRef,
  ...formProps
}: BaseFormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({
    resolver: zodResolver(zodSchema),
    defaultValues,
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
          void methods
            .handleSubmit(onSubmit)(event)
            .catch((error) => {
              console.error(error);
            });
        }}
      >
        <Form {...formProps}>{children}</Form>
      </form>
    </FormProvider>
  );
};
