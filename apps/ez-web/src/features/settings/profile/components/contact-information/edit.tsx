import { Box } from '@cloudscape-design/components';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import { useFormContext } from 'react-hook-form';

import { FormInput } from '@ez/web-ui';
import type { ContactInformation } from './container';

export const ContactInformationEdit = () => {
  const { control } = useFormContext<ContactInformation>();

  return (
    <ColumnLayout columns={3} borders='vertical'>
      <Box variant='div'>
        <Box fontSize='body-m' color='text-status-inactive'>
          Full name
        </Box>
        <FormInput control={control} name='fullName' />
      </Box>
      <Box variant='div'>
        <Box fontSize='body-m' color='text-status-inactive'>
          Company name
        </Box>
        <FormInput control={control} name='companyName' />
      </Box>
      <Box variant='div'>
        <Box fontSize='body-m' color='text-status-inactive'>
          Address
        </Box>
        <FormInput control={control} name='address' />
      </Box>
      <Box variant='div'>
        <Box fontSize='body-m' color='text-status-inactive'>
          Phone number
        </Box>
        <FormInput control={control} name='phoneNumber' inputMode='tel' />
      </Box>
      <Box variant='div'>
        <Box fontSize='body-m' color='text-status-inactive'>
          Website URL
        </Box>
        <FormInput control={control} name='websiteUrl' inputMode='url' />
      </Box>
    </ColumnLayout>
  );
};
