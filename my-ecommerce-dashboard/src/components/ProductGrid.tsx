"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function ProductGrid() {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get("https://fakestoreapi.com/products");
      return response.data;
    },
  });

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Failed to load products</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data?.map((product) => (
        <Link key={product.id} href={`/dashboard/products/${product.id}`}>
          <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 hover:shadow-md transition cursor-pointer">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold text-black dark:text-white truncate">{product.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">${product.price}</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">{product.category}</p>
            <p className="text-yellow-500">⭐ {product.rating.rate}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
