import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { ControlList } from '../../../common/schemas/control-list';

export type MetaItem = {
  id: string;
  name: string;
  controlList: ControlList[];
};

type ProductStoreState = {
  manufacturers: Omit<MetaItem, 'controlList'>[];
  productTypes: Omit<MetaItem, 'controlList'>[];
  catalogCategories: Omit<MetaItem, 'controlList'>[];
};

type ProductStoreActions = {
  addManufacturer: (manufacturer: MetaItem) => void;
  addProductType: (productType: MetaItem) => void;
  addCatalogCategory: (catalogCategory: MetaItem) => void;
};

export const useProductStore = create<ProductStoreState & ProductStoreActions>()(
  persist(
    (set) => ({
      manufacturers: [],
      addManufacturer: (manufacturer) =>
        set((s) => ({ manufacturers: [...s.manufacturers, manufacturer] })),
      productTypes: [],
      addProductType: (productType) =>
        set((s) => ({ productTypes: [...s.productTypes, productType] })),
      catalogCategories: [],
      addCatalogCategory: (catalogCategories) =>
        set((s) => ({ catalogCategories: [...s.catalogCategories, catalogCategories] })),
    }),
    { name: '__MW::ProductStore' }
  )
);
