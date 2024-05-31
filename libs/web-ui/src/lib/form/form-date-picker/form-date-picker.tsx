import type { DatePickerProps, FormFieldProps } from '@cloudscape-design/components';
import { DatePicker, FormField } from '@cloudscape-design/components';
import type { ControllerProps, FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';

type FormDatePickerProps<T extends FieldValues> = Omit<DatePickerProps, 'value'> &
  Omit<FormFieldProps, 'errorText'> &
  Pick<ControllerProps<T>, 'control' | 'name' | 'rules'> & {
    testId?: string;
  };

export const FormDatePicker = <T extends FieldValues>({
  name,
  control,
  rules,
  testId,
  ...props
}: FormDatePickerProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController<T>({ name, control, rules });

  const handleOnChange: DatePickerProps['onChange'] = (event) => {
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
      <DatePicker
        data-testid={testId ? `${testId}_${name}-form-date-picker` : 'form-date-picker'}
        placeholder='YYYY-MM-DD'
        {...props}
        {...field}
        ref={field.ref}
        onChange={handleOnChange}
      />
    </FormField>
  );
};
