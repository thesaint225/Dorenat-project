import { useState, useEffect } from 'react';
import type { Product } from '../types/types';
import { products } from '../data/products';

export default function UseProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      try {
        // Simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setData(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { data, loading };
}
