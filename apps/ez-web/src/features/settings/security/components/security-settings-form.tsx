import { type SubmitHandler, FormProvider, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Box, Button, Form, Header, SpaceBetween } from '@cloudscape-design/components';
import { useEffect } from 'react';
import { FormSelect } from '../../../../common/components/form/form-select/form-select';
import { useAppLayoutStore } from '../../../../store/use-app-layout-store';

//https://chat.openai.com/share/283d3941-15b3-4ec2-8f9c-4cea49a8a9d6

const fetchSecuritySettings = async () => {
  await new Promise((r) => {
    setTimeout(r, 3 * 1000);
  });

  return {
    tfa: 'off',
    recoveryPreference: 'text',
  };
};

const updateSecuritySettings = async () => {
  await new Promise((r) => {
    setTimeout(r, 3 * 1000);
  });

  return {
    tfa: 'off',
    recoveryPreference: 'text',
  };
};

export type SecuritySettingsData = {
  tfa: string;
  recoveryPreference: string;
};

export const SecuritSettingsForm = () => {
  const appLayoutStore = useAppLayoutStore();

  const userPrefs = useQuery({
    queryKey: ['user-security-settings'],
    queryFn: fetchSecuritySettings,
  });

  const updateUserPrefs = useMutation({
    mutationFn: updateSecuritySettings,
  });

  const methods = useForm<SecuritySettingsData>({
    defaultValues: userPrefs.data,
  });

  const handleOnSubmit: SubmitHandler<SecuritySettingsData> = async (
    data: SecuritySettingsData
  ) => {
    await updateUserPrefs.mutateAsync();

    console.info('Form data: ', data);
  };

  useEffect(() => {
    methods.reset(userPrefs.data);

    return () => methods.reset({});
  }, [methods, userPrefs.data]);

  useEffect(() => {
    appLayoutStore.setContentLayout('form');

    return () => appLayoutStore.setContentLayout('default');
  }, []);

  return (
    <Form variant='embedded' header={<Header variant='h2'>Security settings</Header>}>
      <SpaceBetween direction='vertical' size='xs'>
        <FormProvider {...methods}>
          <form
            id='security-settings'
            onSubmit={(event) => {
              void methods.handleSubmit(handleOnSubmit)(event);
            }}
          >
            <SpaceBetween size='m' direction='vertical'>
              <FormSelect
                name={'tfa'}
                label='Two-factor authentication'
                constraintText='Default value is on.'
                control={methods.control}
                placeholder='Choose...'
                disabled={updateUserPrefs.isPending}
                options={[
                  { label: 'on', value: 'on' },
                  { label: 'off', value: 'off' },
                ]}
              />
              <FormSelect
                name={'recoveryPreference'}
                label='Account recovery preference'
                constraintText='Default value is email.'
                control={methods.control}
                placeholder='Choose...'
                disabled={updateUserPrefs.isPending}
                options={[
                  { label: 'email', value: 'email' },
                  { label: 'text', value: 'text' },
                ]}
              />
            </SpaceBetween>
          </form>
        </FormProvider>
        <Box>
          <Button
            variant='primary'
            form='security-settings'
            formAction='submit'
            loading={updateUserPrefs.isPending}
          >
            Save
          </Button>
        </Box>
      </SpaceBetween>
    </Form>
  );
};

/**
             <FormInput
              name='password'
              type='password'
              label='Password'
              control={methods.control}
              placeholder='Enter a password...'
            />
 */
