import { useRef, useState } from 'react';
import { isAxiosError } from 'axios';
import { nanoid } from 'nanoid';
import { Box, Button, Header, Modal, SpaceBetween } from '@cloudscape-design/components';

import { useNotificationStore } from '@ez/web-state-management';
import { BaseForm, FormInput } from '@ez/web-ui';
import { ControlListEditor } from '../../../../common/components/control-list/control-list';
import { useProductTypeApi } from '../../data-access/product-type';
import { type CreateMetaItem, createMetaItemSchema } from '../../schema/meta-item';

type AddProductTypeModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

export const AddProductTypeModal = ({ isVisible, onClose }: AddProductTypeModalProps) => {
  const { addNotification } = useNotificationStore();
  const { createProductType } = useProductTypeApi();

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
      header={<Header variant='h2'>Add a productType</Header>}
      footer={
        <Box float='right'>
          <SpaceBetween direction='horizontal' size='xs'>
            <Button formAction='none' onClick={handleLeaveForm}>
              Cancel
            </Button>
            <Button
              variant='primary'
              form='form_create-productType'
              formAction='submit'
              loading={createProductType.isPending}
              loadingText='Adding ProductType'
            >
              Add ProductType
            </Button>
          </SpaceBetween>
        </Box>
      }
      onDismiss={handleLeaveForm}
    >
      <BaseForm
        formId='form_create-productType'
        zodSchema={createMetaItemSchema}
        formRef={formRef}
        errorIconAriaLabel='Error icon'
        errorText={formError}
        onSubmit={async (data: CreateMetaItem) => {
          try {
            const mid = nanoid(4);

            await createProductType.mutateAsync({ id: mid, ...data });

            handleLeaveForm();
            addNotification({
              id: nanoid(4),
              type: 'success',
              header: `ProductType ${mid} created successfully`,
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
          <ControlListEditor />
        </SpaceBetween>
      </BaseForm>
    </Modal>
  );
};
