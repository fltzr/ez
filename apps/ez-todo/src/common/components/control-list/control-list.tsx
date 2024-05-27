import { AttributeEditor, FormField, HelpPanel, Link } from '@cloudscape-design/components';
import { useController, useFieldArray, useFormContext } from 'react-hook-form';

import { useAppLayoutStore } from '@ez/web-state-management';
import { FormInput, FormMultiselect, FormSelect } from '@ez/web-ui';

const defaultControlListConfig = {
  permittedActions: [
    { value: 'SELECT', label: 'View' },
    { value: 'UPDATE', label: 'Update' },
    { value: 'DELETE', label: 'Delete' },
  ],
  accessTypeOptions: [
    { value: 'ROLE', label: 'Role' },
    { value: 'GROUP', label: 'Group' },
    { value: 'USER', label: 'User' },
  ],
  controlListPath: 'controlList',
};

type ControlListEditorProps = { showInfoLinks?: boolean };

export const ControlListEditor = ({ showInfoLinks }: ControlListEditorProps) => {
  const { setToolsOpen, setToolsContent } = useAppLayoutStore();

  const { control } = useFormContext();

  const {
    fieldState: { error },
  } = useController({ control, name: 'controlList' });

  const { fields, append, remove } = useFieldArray({
    control,
    name: defaultControlListConfig.controlListPath,
  });

  return (
    <FormField
      stretch
      errorText={error?.message}
      label='Controls'
      description='Controls are used to define the access permissions for the resource.'
      constraintText='At least one control must be defined.'
      info={
        showInfoLinks && (
          <Link
            variant='info'
            onFollow={() => {
              setToolsOpen(true);
              setToolsContent(<HelpPanel>control-list</HelpPanel>);
            }}
          >
            info
          </Link>
        )
      }
    >
      <AttributeEditor
        addButtonText={'Add control'}
        items={fields}
        empty='No controls added yet.'
        definition={[
          {
            label: 'Permitted actions',
            control: (_, index) => (
              <FormMultiselect
                control={control}
                name={`controlList.${index}.permittedActions`}
                placeholder='Select resource actions'
                options={defaultControlListConfig.permittedActions}
              />
            ),
            info: showInfoLinks && (
              <Link
                variant='info'
                onFollow={() => {
                  setToolsOpen(true);
                  setToolsContent(<HelpPanel>permitted actions</HelpPanel>);
                }}
              >
                info
              </Link>
            ),
          },
          {
            label: 'Access type',
            control: (_, index) => (
              <FormSelect
                control={control}
                name={`controlList.${index}.accessType`}
                placeholder='Select access type'
                options={defaultControlListConfig.accessTypeOptions}
              />
            ),
            info: showInfoLinks && (
              <Link
                variant='info'
                onFollow={() => {
                  setToolsOpen(true);
                  setToolsContent(<HelpPanel>access type</HelpPanel>);
                }}
              >
                info
              </Link>
            ),
          },
          {
            label: 'Granted to',
            control: (_, index) => (
              <FormInput
                stretch
                control={control}
                name={`controlList.${index}.grantedTo`}
                placeholder='Enter role, group, user, etc.'
              />
            ),
            info: showInfoLinks && (
              <Link
                variant='info'
                onFollow={() => {
                  setToolsOpen(true);
                  setToolsContent(<HelpPanel>granted to</HelpPanel>);
                }}
              >
                info
              </Link>
            ),
          },
        ]}
        onRemoveButtonClick={({ detail }) => remove(detail.itemIndex)}
        onAddButtonClick={() => append({ accessType: '', grantedTo: '', permittedActions: [] })}
      />
    </FormField>
  );
};
