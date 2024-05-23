import { useEffect } from 'react';

import { useAppLayoutStore } from '@ez/web-state-management';
import { SecuritSettingsForm } from './security/components/security-settings-form';

//https://chat.openai.com/share/283d3941-15b3-4ec2-8f9c-4cea49a8a9d6

const SettingsSecurity = () => {
  const appLayoutStore = useAppLayoutStore();

  useEffect(() => {
    appLayoutStore.setContentLayout('form');

    return () => appLayoutStore.setContentLayout('default');
  }, [appLayoutStore]);

  return <SecuritSettingsForm />;
};

export const Component = SettingsSecurity;

/**
             <FormInput
              name='password'
              type='password'
              label='Password'
              control={methods.control}
              placeholder='Enter a password...'
            />
 */
