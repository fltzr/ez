
import { Form, type FormProps } from '@cloudscape-design/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { useImperativeHandle, type ReactNode, type Ref } from 'react';
import { FormProvider, useForm, type FieldValues, type SubmitHandler } from 'react-hook-form';
import type { z } from 'zod';

type BaseFormProps<TFormValues extends FieldValues> = {
  formId: string;
  zodSchema: z.ZodSchema;
  onSubmit: SubmitHandler<TFormValues>;
  children: ReactNode;
  formRef: Ref<{ reset: () => void }>;
} & Omit<FormProps, 'children' | 'className' | 'id'>;

export const BaseForm = <TFormValues extends FieldValues>({
  formId,
  zodSchema,
  onSubmit,
  children,
  formRef,
  ...formProps
}: BaseFormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({
    resolver: zodResolver(zodSchema),
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
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          // eslint-disable-next-line no-void
          void methods.handleSubmit(onSubmit, (errors) => {
            console.error(`ERROR: ${JSON.stringify(errors, null, 2)}`);
          })(event);
        }}
      >
        <Form {...formProps}>{children}</Form>
      </form>
    </FormProvider>
  );
};
