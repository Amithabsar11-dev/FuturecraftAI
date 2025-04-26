"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

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

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("https://fakestoreapi.com/products");
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get("https://fakestoreapi.com/products/categories");
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? product.category === category : true;
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    const matchesRating = product.rating.rate >= rating;
    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  const totalProducts = filteredProducts.length || 0;
  const averagePrice =
    totalProducts > 0
      ? filteredProducts.reduce((sum, product) => sum + product.price, 0) / totalProducts
      : 0;
  const totalCategories = new Set(filteredProducts.map((product) => product.category)).size;

  const addProduct = () => {
    const newProduct = {
      id: Date.now(),
      title: "New Product",
      price: Math.floor(Math.random() * 100) + 10,
      category: "electronics",
      image: "https://via.placeholder.com/150",
      rating: { rate: 4.5, count: 10 },
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const editProduct = (id: number) => {
    const updatedProducts = products.map((product) =>
      product.id === id
        ? { ...product, title: "Updated Product", price: 99.99 }
        : product
    );
    setProducts(updatedProducts);
  };

  const deleteProduct = (id: number) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 border rounded shadow text-center">
          <h3 className="text-xl font-semibold">Total Products</h3>
          <p className="text-3xl font-bold">{totalProducts}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 border rounded shadow text-center">
          <h3 className="text-xl font-semibold">Average Price</h3>
          <p className="text-3xl font-bold">${averagePrice.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 border rounded shadow text-center">
          <h3 className="text-xl font-semibold">Categories</h3>
          <p className="text-3xl font-bold">{totalCategories}</p>
        </div>
      </div>

      {/* Page Title */}
      <h1 className="text-2xl font-bold text-black dark:text-white">All Products</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-900 border rounded">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full dark:bg-gray-700 dark:text-white"
        />
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="p-2 border rounded w-1/2 dark:bg-gray-700 dark:text-white"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="p-2 border rounded w-1/2 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded w-full dark:bg-gray-700 dark:text-white"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="p-2 border rounded w-full dark:bg-gray-700 dark:text-white"
        >
          <option value={0}>All Ratings</option>
          <option value={1}>1 ⭐ & up</option>
          <option value={2}>2 ⭐ & up</option>
          <option value={3}>3 ⭐ & up</option>
          <option value={4}>4 ⭐ & up</option>
        </select>
      </div>

      {/* Add Product Button */}
      <button
        onClick={addProduct}
        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full sm:w-auto"
      >
        Add New Product
      </button>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded p-4 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 w-full object-contain mb-4"
            />
            <h2 className="text-lg font-semibold text-black dark:text-white">{product.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">${product.price}</p>
            <p className="text-yellow-500 mt-1">⭐ {product.rating.rate}</p>

            {/* Edit and Delete Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <button
                onClick={() => editProduct(product.id)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded flex-1"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded flex-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
