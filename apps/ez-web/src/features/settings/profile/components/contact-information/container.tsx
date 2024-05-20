import { Box, Button, Container, Header, SpaceBetween } from '@cloudscape-design/components';
import { BaseSyntheticEvent, useRef, useState } from 'react';
import { z } from 'zod';
import { ContactInformationEdit } from './edit';
import { ContactInformationView } from './view';
import { BaseForm } from '@ez/web-ui';
import { FieldValues } from 'react-hook-form';
import { useLocalStorage } from '../../../../../common/hooks/use-local-storage';

const wait = (seconds: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });

const contactInformationSchema = z.object({
  fullName: z.string().min(1, 'Invalid name.'),
  companyName: z.string().min(1, 'Invalid company name.'),
  address: z.string(),
  phoneNumber: z.string().min(11, 'Invalid valid phone number.'),
  websiteUrl: z.string().url({ message: 'Invalid website URL.' }),
});

export type ContactInformation = z.infer<typeof contactInformationSchema>;

export const ContactInformationContainer = () => {
  const formRef = useRef<{ reset: () => void }>(null);
  const [contactInformation, setContactInformation] = useLocalStorage<ContactInformation>({
    localstorageKey: 'contact-information',
    initialValue: {
      fullName: '',
      companyName: '',
      address: '',
      phoneNumber: '',
      websiteUrl: '',
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const getDefaultContactInformation = async () => {
    await wait(4);

    return contactInformation;
  };

  return (
    <BaseForm
      formId={'form__contact-information'}
      zodSchema={contactInformationSchema}
      defaultValues={getDefaultContactInformation}
      onSubmit={async (data) => {
        const formData = await data();
        setContactInformation({ ...formData });
      }}
      formRef={formRef}
    >
      <Container
        variant='stacked'
        header={
          <Header
            variant='h2'
            actions={
              isEditing ? undefined : (
                <Button
                  onClick={() => {
                    setIsEditing(true);
                    formRef.current?.reset();
                  }}
                >
                  Edit
                </Button>
              )
            }
          >
            Contact information
          </Header>
        }
        footer={
          isEditing ? (
            <Box float='right'>
              <SpaceBetween direction='horizontal' size='s'>
                <Button
                  onClick={() => {
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>
                <Button variant='primary'>Save</Button>
              </SpaceBetween>
            </Box>
          ) : undefined
        }
      >
        {isEditing ? <ContactInformationEdit /> : <ContactInformationView />}
      </Container>
    </BaseForm>
  );
};
