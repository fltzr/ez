import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ControlList } from '../../../common/schemas/control-list';

export type Manufacturer = {
  id: string;
  name: string;
  controlList: ControlList[];
};

type ProductStoreState = {
  manufacturers: Omit<Manufacturer, 'controlList'>[];
};

type ProductStoreActions = {
  addManufacturer: (manufacturer: Manufacturer) => void;
};

export const useProductStore = create<ProductStoreState & ProductStoreActions>()(
  persist(
    (set) => ({
      manufacturers: [],
      addManufacturer: (manufacturer) =>
        set((s) => ({ manufacturers: [...s.manufacturers, manufacturer] })),
    }),
    { name: '__MW::ProductStore' },
  ),
);
