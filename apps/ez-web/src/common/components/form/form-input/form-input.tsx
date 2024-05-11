
import {
  type FormFieldProps,
  type InputProps,
  FormField,
  Input,
  Spinner,
} from '@cloudscape-design/components';
import { type ControllerProps, type FieldValues, useController } from 'react-hook-form';

type FormInputProps<T extends FieldValues> = Omit<
  InputProps,
  'name' | 'value' | 'options' | 'inputedOption'
> &
  Omit<FormFieldProps, 'errorText'> &
  Pick<ControllerProps<T>, 'control' | 'name' | 'rules'> & {
    isLoading?: boolean;
  };

export const FormInput = <T extends FieldValues>({
  name,
  control,
  rules,
  isLoading,
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
      {isLoading ? (
        <Spinner size='normal' />
      ) : (
        <Input {...props} {...field} ref={field.ref} onChange={handleOnChange} />
      )}
    </FormField>
  );
};
