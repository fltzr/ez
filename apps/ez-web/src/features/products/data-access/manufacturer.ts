import { useMutation, useQuery } from '@tanstack/react-query';
import { type MetaItem, useProductStore } from '../store/use-product-store';

const wait = (seconds: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });

export const useManufacturerApi = () => {
  const { manufacturers, addManufacturer } = useProductStore();

  const getManufacturers = useQuery({
    queryKey: ['manufacturers', manufacturers],
    queryFn: async () => {
      console.info('Fetching manufacturers...');

      await wait(5);

      return manufacturers;
    },
    enabled: false,
  });

  const createManufacturer = useMutation({
    mutationFn: async (manufacturer: MetaItem) => {
      await wait(2);

      addManufacturer(manufacturer);
    },
  });

  return {
    getManufacturers,
    createManufacturer,
  };
};
