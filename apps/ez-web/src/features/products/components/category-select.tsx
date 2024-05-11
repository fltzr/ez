/* eslint-disable react/jsx-props-no-spreading */
import { Grid, Box, Button, Link } from '@cloudscape-design/components';
import type { FieldValues } from 'react-hook-form';
import {
  FormSelect,
  type FormSelectProps,
} from '../../../common/components/form/form-select/form-select';

type CategorySelectProps<T extends FieldValues> = FormSelectProps<T> & {
  onAddNew: () => void;
  onRefresh?: () => void;
};

export const CategorySelect = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  onAddNew,
  onRefresh,
  ...props
}: CategorySelectProps<T>) => {
  return (
    <FormSelect
      {...props}
      control={control}
      name={name}
      label={label}
      placeholder={placeholder}
      secondaryControl={
        <Grid disableGutters gridDefinition={[{ colspan: 2 }, { colspan: 10 }]}>
          <Button variant='icon' iconName='refresh' formAction='none' onClick={onRefresh} />
          <Box margin={{ top: 'xxs' }}>
            <Link
              variant='secondary'
              onFollow={(event) => {
                event.preventDefault();
                onAddNew();
              }}
            >
              Add a new {label?.toString().toLocaleLowerCase()}
            </Link>
          </Box>
        </Grid>
      }
    />
  );
};
