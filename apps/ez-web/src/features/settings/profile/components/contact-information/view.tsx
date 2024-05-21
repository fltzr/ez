import ColumnLayout from '@cloudscape-design/components/column-layout';
import { useController, useFormContext } from 'react-hook-form';
import { ContactInformation } from './container';
import { Box } from '@cloudscape-design/components';

export const ContactInformationView = () => {
  const { getValues, control } = useFormContext<ContactInformation>();
  const {
    field: { value: fullNameValue },
  } = useController({ control, name: 'fullName' });

  return (
    <ColumnLayout columns={3} borders='vertical'>
      <Box variant='div'>
        <Box fontSize='body-m' color='text-status-inactive'>
          Full name
        </Box>
        <Box>{fullNameValue}</Box>
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
    </ColumnLayout>
  );
};
