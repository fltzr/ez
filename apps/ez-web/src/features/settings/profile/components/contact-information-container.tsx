import {
  Box,
  Button,
  ColumnLayout,
  Container,
  Header,
  SpaceBetween,
} from '@cloudscape-design/components';
import { BaseSyntheticEvent, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { BaseForm, FormInput } from '@ez/web-ui';
import { z } from 'zod';

const contactInformationSchema = z.object({
  fullName: z.string().min(1, 'Invalid name.'),
  companyName: z.string().min(1, 'Invalid company name.'),
  address: z.string(),
  phoneNumber: z.string().min(11, 'Invalid valid phone number.'),
  websiteUrl: z.string().url({ message: 'Invalid website URL.' }),
});

type ContactInformation = z.infer<typeof contactInformationSchema>;

const defaultContactInformation: ContactInformation = {
  fullName: 'John Doe',
  companyName: 'Example Corp',
  address: '1234 Example St',
  phoneNumber: '+1 123 456 7890',
  websiteUrl: 'None',
};

export const ContactInformationContainer = () => {
  const { control, getValues } = useForm<ContactInformation>({
    defaultValues: defaultContactInformation,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  // const handleChange = (key: string, value: string) => {
  //   setForm({
  //     ...form,
  //     [key]: value,
  //   });
  // }

  return (
    <Container
      variant='stacked'
      header={
        <Header
          variant='h2'
          actions={isEditing ? undefined : <Button onClick={handleEdit}>Edit</Button>}
        >
          Contact information
        </Header>
      }
      footer={
        isEditing ? (
          <Box float='right'>
            <SpaceBetween direction='horizontal' size='s'>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button variant='primary' onClick={handleSave}>
                Save
              </Button>
            </SpaceBetween>
          </Box>
        ) : undefined
      }
    >
      <ColumnLayout borders='vertical' columns={3}>
        {isEditing ? (
          <>
            {/* <Box variant='div'>
              <FormInput control={control} name='fullName' label='Full name' />
            </Box>
            <Box variant='div'>
              <FormInput control={control} name='companyName' label='Company name' />
            </Box>
            <Box variant='div'>
              <FormInput control={control} name='companyName' label='' />
            </Box> */}
            <BaseForm 
              formId={''} 
              zodSchema={contactInformationSchema} 
              onSubmit={}
              formRef={null}>
                
            
          </>
        ) : (
          <>
            <Box variant='div'>
              <Box fontSize='body-m' color='text-status-inactive'>
                Full name
              </Box>
              <Box>{getValues('fullName')}</Box>
            </Box>
            <Box variant='div'>
              <Box fontSize='body-m' color='text-status-inactive'>
                Company name
              </Box>
              <Box>{getValues('companyName')}</Box>
            </Box>
            <Box variant='div'>
              <Box fontSize='body-m' color='text-status-inactive'>
                Address
              </Box>
              <Box>{getValues('address')}</Box>
            </Box>
            <Box variant='div'>
              <Box fontSize='body-m' color='text-status-inactive'>
                Phone number
              </Box>
              <Box>{getValues('phoneNumber')}</Box>
            </Box>
            <Box variant='div'>
              <Box fontSize='body-m' color='text-status-inactive'>
                Website URL
              </Box>
              <Box>{getValues('websiteUrl')}</Box>
            </Box>
          </>
        )}
      </ColumnLayout>
    </Container>
  );
};
