import { useRef, useState } from 'react';
import { isAxiosError } from 'axios';
import { nanoid } from 'nanoid';
import { Box, Button, Header, Modal, SpaceBetween } from '@cloudscape-design/components';

import { useNotificationStore } from '@ez/web-state-management';
import { BaseForm, FormInput } from '@ez/web-ui';
import { ControlListEditor } from '../../../../common/components/control-list/control-list';
import { useManufacturerApi } from '../../data-access/manufacturer';
import { type CreateMetaItem, createMetaItemSchema } from '../../schema/meta-item';

type AddManufacturerModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

export const AddManufacturerModal = ({ isVisible, onClose }: AddManufacturerModalProps) => {
  const { addNotification } = useNotificationStore();
  const { createManufacturer } = useManufacturerApi();

  const formRef = useRef<{ reset: () => void }>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleLeaveForm = () => {
    if (formRef.current) {
      formRef.current.reset();
    }

    onClose();
  };
  return (
    <Modal
      size='large'
      visible={isVisible}
      header={<Header variant='h2'>Add a manufacturer</Header>}
      footer={
        <Box float='right'>
          <SpaceBetween direction='horizontal' size='xs'>
            <Button formAction='none' onClick={handleLeaveForm}>
              Cancel
            </Button>
            <Button
              variant='primary'
              form='form_create-manufacturer'
              formAction='submit'
              loading={createManufacturer.isPending}
              loadingText='Adding Manufacturer'
            >
              Add Manufacturer
            </Button>
          </SpaceBetween>
        </Box>
      }
      onDismiss={handleLeaveForm}
    >
      <BaseForm
        formId='form_create-manufacturer'
        zodSchema={createMetaItemSchema}
        formRef={formRef}
        errorIconAriaLabel='Error icon'
        errorText={formError}
        onSubmit={async (data: CreateMetaItem) => {
          try {
            const mid = nanoid(4);

            await createManufacturer.mutateAsync({ id: mid, ...data });

            handleLeaveForm();
            addNotification({
              id: nanoid(4),
              type: 'success',
              header: `Manufacturer ${mid} created successfully`,
              dismissible: true,
            });
          } catch (error) {
            if (isAxiosError(error)) {
              setFormError(error.message);
            }
          }
        }}
      >
        <SpaceBetween direction='vertical' size='m'>
          <FormInput name='name' label='Name' />
          <ControlListEditor showInfoLinks={false} />
        </SpaceBetween>
      </BaseForm>
    </Modal>
  );
};
