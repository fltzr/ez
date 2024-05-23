import { useEffect, useRef, useState } from 'react';

import { useAppLayoutStore } from '@ez/web-state-management';
import { ProductForms } from './components/forms/product-forms';
import { AddCatalogCategoryModal } from './components/modals/add-catalog-category-modal';
import { AddManufacturerModal } from './components/modals/add-manufacturer-modal';
import { AddProductTypeModal } from './components/modals/add-product-type-modal';
import type { Product } from './schema/product';

const CreateProductPage = () => {
  const formRef = useRef<{ reset: () => void }>(null);
  const appLayoutStore = useAppLayoutStore();

  const [isManufacturerModalOpen, setIsManufacturerModalOpen] = useState(false);
  const [isProductTypeModalOpen, setIsProductTypeModalOpen] = useState(false);
  const [isCatalogCategoryModalOpen, setIsCatalogCategoryModalOpen] = useState(false);

  useEffect(() => {
    appLayoutStore.setContentLayout('table');
    appLayoutStore.setNavigationOpen(false);

    return () => {
      appLayoutStore.setContentLayout('default');
      appLayoutStore.setNavigationOpen(true);
    };
  }, [appLayoutStore]);

  const handleSubmit = (data: Product) => {
    console.info('Product data:');
    console.info(JSON.stringify(data, null, 2));
  };

  return (
    <div style={{ maxWidth: '875px' }}>
      <ProductForms
        formRef={formRef}
        setManufacturerModalOpen={setIsManufacturerModalOpen}
        setProductTypeModalOpen={setIsProductTypeModalOpen}
        setCatalogCategoryModalOpen={setIsCatalogCategoryModalOpen}
        onSubmit={handleSubmit}
      />
      <AddManufacturerModal
        isVisible={isManufacturerModalOpen}
        onClose={() => setIsManufacturerModalOpen(false)}
      />
      <AddProductTypeModal
        isVisible={isProductTypeModalOpen}
        onClose={() => setIsProductTypeModalOpen(false)}
      />
      <AddCatalogCategoryModal
        isVisible={isCatalogCategoryModalOpen}
        onClose={() => setIsCatalogCategoryModalOpen(false)}
      />
    </div>
  );
};

export const Component = CreateProductPage;
