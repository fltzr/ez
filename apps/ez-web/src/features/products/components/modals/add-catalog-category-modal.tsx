import { Box, Button, Header, Modal, SpaceBetween } from '@cloudscape-design/components';
import { useRef } from 'react';
import { type CreateMetaItem, createMetaItemSchema } from '../../schema/meta-item';
import { ControlListEditor } from '../../../../common/components/control-list/control-list';
import { BaseForm } from '../../../../common/components/form/base-form/base-form';
import { FormInput } from '../../../../common/components/form/form-input/form-input';

type AddCatalogCategoryModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

export const AddCatalogCategoryModal = ({ isVisible, onClose }: AddCatalogCategoryModalProps) => {
  const formRef = useRef<{ reset: () => void }>(null);

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
      header={<Header variant='h2'>Add a catalog category</Header>}
      footer={
        <Box float='right'>
          <SpaceBetween direction='horizontal' size='xs'>
            <Button formAction='none' onClick={handleLeaveForm}>
              Cancel
            </Button>
            <Button variant='primary' form='form_create-catalog-category' formAction='submit'>
              Add catalog category
            </Button>
          </SpaceBetween>
        </Box>
      }
      onDismiss={handleLeaveForm}
    >
      <BaseForm
        formId='form_create-catalog-category'
        zodSchema={createMetaItemSchema}
        formRef={formRef}
        onSubmit={(data: CreateMetaItem) => {
          console.info(JSON.stringify(data, null, 2));
          handleLeaveForm();
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
