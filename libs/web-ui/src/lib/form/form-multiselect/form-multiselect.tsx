import {
  type FormFieldProps,
  type MultiselectProps,
  FormField,
  Multiselect,
} from '@cloudscape-design/components';
import { type ControllerProps, type FieldValues, useController } from 'react-hook-form';

type FormMultiselectProps<T extends FieldValues> = Omit<
  MultiselectProps,
  'name' | 'value' | 'options' | 'selectedOptions'
> &
  Omit<FormFieldProps, 'errorText'> &
  Pick<ControllerProps<T>, 'control' | 'name' | 'rules'> & {
    options: MultiselectProps.Option[];
  };

export const FormMultiselect = <T extends FieldValues>({
  name,
  control,
  rules,
  options,
  ...props
}: FormMultiselectProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController<T>({ name, control, rules });

  const handleOnChange: MultiselectProps['onChange'] = (event) => {
    field.onChange(event.detail.selectedOptions);
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
      <Multiselect
        {...props}
        ref={field.ref}
        options={options}
        selectedOptions={field.value}
        onChange={handleOnChange}
      />
    </FormField>
  );
};
