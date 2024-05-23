import { useMutation, useQuery } from '@tanstack/react-query';
import { type MetaItem, useProductStore } from '../store/use-product-store';

const wait = (seconds: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });

export const useProductTypeApi = () => {
  const { productTypes, addProductType } = useProductStore();

  const getProductTypes = useQuery({
    queryKey: ['productTypes', productTypes],
    queryFn: async () => {
      console.info('Fetching productTypes...');

      await wait(5);

      return productTypes;
    },
    enabled: false,
  });

  const createProductType = useMutation({
    mutationFn: async (productType: MetaItem) => {
      await wait(2);

      addProductType(productType);
    },
  });

  return {
    getProductTypes,
    createProductType,
  };
};
