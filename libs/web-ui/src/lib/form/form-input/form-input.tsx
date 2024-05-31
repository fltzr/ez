import { useState } from 'react';
import {
  type FormFieldProps,
  type InputProps,
  FormField,
  Input,
  Button,
} from '@cloudscape-design/components';
import { type ControllerProps, type FieldValues, useController } from 'react-hook-form';

type FormInputProps<T extends FieldValues> = Omit<InputProps, 'name' | 'value'> &
  Omit<FormFieldProps, 'errorText'> &
  Pick<ControllerProps<T>, 'control' | 'name' | 'rules'> & {
    testId?: string;
    sensitive?: boolean;
  };

export const FormInput = <T extends FieldValues>({
  name,
  control,
  rules,
  testId,
  sensitive,
  ...props
}: FormInputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController<T>({ name, control, rules });
  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleOnChange: InputProps['onChange'] = (event) => {
    field.onChange(event.detail.value);
  };

  return (
    <FormField
      stretch={props.stretch}
      label={props.label}
      info={props.info}
      description={props.description}
      constraintText={props.constraintText}
      errorText={error?.message}
    >
      <Input
        {...props}
        {...field}
        data-testid={testId ? `${testId}_form-input` : 'form-input'}
        ref={field.ref}
        type={sensitive ? (isInputVisible ? 'text' : 'password') : 'text'}
        placeholder={
          sensitive ? (isInputVisible ? props.placeholder : '●●●●●●●●') : props.placeholder
        }
        onChange={handleOnChange}
      />
      {sensitive ? (
        <Button
          formAction='none'
          data-testid={testId ? `${testId}_form-input-toggle` : 'form-input-toggle'}
          variant='icon'
          iconName={isInputVisible ? 'lock-private' : 'unlocked'}
          onClick={() => setIsInputVisible((prev) => !prev)}
        />
      ) : (
        props.secondaryControl
      )}
    </FormField>
  );
};
