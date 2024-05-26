import {
  type FormFieldProps,
  type InputProps,
  FormField,
  Input,
} from '@cloudscape-design/components';
import { type ControllerProps, type FieldValues, useController } from 'react-hook-form';

type FormInputProps<T extends FieldValues> = Omit<InputProps, 'name' | 'value'> &
  Omit<FormFieldProps, 'errorText'> &
  Pick<ControllerProps<T>, 'control' | 'name' | 'rules'> & {
    isLoading?: boolean;
    testId?: string;
  };

export const FormInput = <T extends FieldValues>({
  name,
  control,
  rules,
  isLoading,
  testId,
  ...props
}: FormInputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController<T>({ name, control, rules });

  const handleOnChange: InputProps['onChange'] = (event) => {
    field.onChange(event.detail.value);
  };

  return (
    <FormField
      label={props.label}
      info={props.info}
      description={props.description}
      constraintText={props.constraintText}
      stretch={props.stretch}
      secondaryControl={props.secondaryControl}
      errorText={error?.message}
    >
      <Input
        data-testid={testId ? `${testId}_form-input` : 'form-input'}
        {...props}
        {...field}
        ref={field.ref}
        onChange={handleOnChange}
      />
    </FormField>
  );
};
