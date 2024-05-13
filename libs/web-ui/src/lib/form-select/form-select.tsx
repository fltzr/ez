import { type ControllerProps, type FieldValues, useController } from 'react-hook-form';
import {
  type FormFieldProps,
  type SelectProps,
  FormField,
  Select,
} from '@cloudscape-design/components';

export type FormSelectProps<T extends FieldValues> = Omit<
  SelectProps,
  'name' | 'value' | 'options' | 'selectedOption'
> &
  Omit<FormFieldProps, 'errorText'> &
  Pick<ControllerProps<T>, 'control' | 'name' | 'rules'> & {
    options: SelectProps.Option[];
  };

export const FormSelect = <T extends FieldValues>({
  name,
  control,
  rules,
  options,
  ...props
}: FormSelectProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController<T>({ name, control, rules });

  const handleOnChange: SelectProps['onChange'] = (event) => {
    field.onChange(event.detail.selectedOption);
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
      <Select
        {...props}
        ref={field.ref}
        placeholder={props.placeholder}
        options={options}
        selectedOption={options.find((option) => option.value === field.value?.value) ?? {}}
        onChange={handleOnChange}
      />
    </FormField>
  );
};
