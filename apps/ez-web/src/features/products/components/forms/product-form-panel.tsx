import { ExpandableSection, HelpPanel, Link, SpaceBetween } from '@cloudscape-design/components';
import { useFormContext } from 'react-hook-form';

import { useAppLayoutStore } from '@ez/web-state-management';
import { FormInput } from '@ez/web-ui';
import type { Product } from '../../schema/product';

export const ProductFormPanel = () => {
  const { setToolsOpen, setToolsContent } = useAppLayoutStore();
  const { control } = useFormContext<Product>();

  return (
    <ExpandableSection
      defaultExpanded
      variant='container'
      headerText='Product'
      headerInfo={
        <Link
          variant='info'
          onFollow={() => {
            setToolsOpen(true);
            setToolsContent(<HelpPanel>product-form-panel</HelpPanel>);
          }}
        >
          info
        </Link>
      }
    >
      <SpaceBetween direction='vertical' size='m'>
        <FormInput
          disableBrowserAutocorrect
          control={control}
          name='name'
          label='Name'
          placeholder='Macbook Pro'
          description='Enter the name of the product.'
          info={
            <Link
              variant='info'
              onFollow={() => {
                setToolsOpen(true);
                setToolsContent(<HelpPanel>product-form-panel input-name</HelpPanel>);
              }}
            >
              info
            </Link>
          }
        />
        <FormInput
          disableBrowserAutocorrect
          control={control}
          name='price'
          label='Price'
          placeholder='1000.00'
          description='Enter the price of the product in USD.'
          type='number'
          inputMode='decimal'
          info={
            <Link
              variant='info'
              onFollow={() => {
                setToolsOpen(true);
                setToolsContent(<HelpPanel>product-form-panel input-price</HelpPanel>);
              }}
            >
              info
            </Link>
          }
        />
      </SpaceBetween>
    </ExpandableSection>
  );
};
