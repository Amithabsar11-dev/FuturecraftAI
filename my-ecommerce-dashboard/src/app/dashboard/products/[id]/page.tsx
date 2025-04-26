"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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

export default function ProductDetailPage() {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center text-xl">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-xl text-red-500">
        Failed to load product
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-8">
      <Link href="/" className="text-white-500 mb-4 inline-block">
        ← Back to Products
      </Link>

      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* Product Image */}
        <div className="flex-shrink-0 w-full lg:w-2/5">
          <Image
            src={product?.image || "/path/to/default/image.jpg"} // Fallback to a default image if product?.image is undefined
            alt={product?.title || "Default Product"}
            width={500}  // Set a fixed width or use dynamic width based on your design
            height={500}
            className="w-full h-auto rounded-lg shadow-lg object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {product?.title}
          </h1>
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            ${product?.price}
          </p>

          <div className="mb-4">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {product?.category}
            </p>
          </div>

          <div className="flex items-center space-x-2 mb-6">
            <p className="text-yellow-500 text-xl">⭐ {product?.rating.rate}</p>
            <span className="text-gray-600 dark:text-gray-400">
              ({product?.rating.count} reviews)
            </span>
          </div>

          <button className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
