import { useEffect, useRef, useState } from 'react';
import type { Product } from './schema/product';
import { ProductForms } from './components/forms/product-forms';
import { AddManufacturerModal } from './components/modals/add-manufacturer-modal';
import { AddCatalogCategoryModal } from './components/modals/add-catalog-category-modal';
import { AddProductTypeModal } from './components/modals/add-product-type-modal';
import { useAppLayoutStore } from '@ez/web-state-management';

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
  }, []);

  const handleSubmit = (data: Product) => {
    console.info('Product data:');
    console.info(JSON.stringify(data, null, 2));
  };

  return (
    <div style={{ width: '1175px' }}>
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
