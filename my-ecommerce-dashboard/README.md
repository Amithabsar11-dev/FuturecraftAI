This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

1. **Responsive Layout**:
   - A responsive dashboard layout was created using **Tailwind CSS** for flexibility and simplicity.
   - The layout includes:
     - **Sidebar navigation** with links to different pages (e.g., Products).
     - **Header** with user info and a logout button.
     - **Main content area** that adjusts based on screen size, ensuring a smooth user experience across devices.

### Products Management

2. **Fetching Products**:

   - Products are fetched from the **Fake Store API** (`https://fakestoreapi.com/products`) using **React Query**.
   - Each product includes the following details:
     - Product **image**
     - Product **title**
     - **Price**
     - **Category**
     - **Rating**
     - **Stock status** (simulated)

3. **Displaying Products**:
   - Products are displayed in a **responsive grid** layout using **Tailwind CSS**:
     - On small screens, products are shown in a single column.
     - On larger screens, products are arranged in a multi-column layout.
   - Product cards include details such as **image**, **title**, **price**, **category**, and **rating**.

### Filtering System

4. **Filtering Options**:
   - **Price Range**: Implemented a **min/max slider** to filter products within a specific price range.
   - **Category Filter**: A dropdown selector allows users to filter by product category.
   - **Rating Filter**: A star rating selector enables filtering based on product ratings.
   - **Search by Name**: Users can search products by name using a simple input field.

### Additional Features

5. **Product Detail View**:

   - When clicking on a product, users are directed to a detailed product page with full information, including the product's image, price, category, and rating.
   - **React Query** is used to fetch product details from the API dynamically.

6. **Pagination or Infinite Scroll**:

   - For better performance, products can be paginated or infinite scroll can be implemented (to be added as needed).

7. **Analytics Section**:

   - A simple **analytics dashboard** displays total products, average price, and other statistics (e.g., total categories).
   - Calculations are done dynamically based on the filtered products.

8. **Add/Edit/Delete Functionality**:

   - **Mock add/edit/delete functionality** has been implemented to simulate adding, editing, and deleting products (without persistence).
   - **Buttons** are provided to modify product details directly in the UI, allowing for testing and interaction.

9. **User-friendly Navigation**:

   - The product pages include **easy navigation** with a "Back to Products" link that directs users back to the product list.
   - Links to specific products are dynamically generated using **Next.js Link**.

10. **Responsive Design**:

- All components, including the product grid, filters, and detail view, have been made **responsive** using **Tailwind CSS** to ensure a smooth and adaptive user experience across devices (desktop, tablet, mobile).
