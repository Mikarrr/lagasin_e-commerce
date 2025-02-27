import defaultFetchOptions from "../utils/fetchOptions/fetchOptions";
import ProductContent from "./productContent";

const ProductSection = async () => {
  try {
    const [productsResponse, categoriesResponse] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/products`, {
        cache: "no-cache",
        method: "GET",
      }),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/category`, {
        ...defaultFetchOptions,
        method: "GET",
      }),
    ]);

    if (!productsResponse.ok || !categoriesResponse.ok) {
      throw new Error("Failed to fetch products or categories.");
    }

    const products = await productsResponse.json();
    const categories = await categoriesResponse.json();

    return <ProductContent products={products} categories={categories} />;
  } catch (error) {
    console.error(error);
    return <div>Error loading products. Please try again later.</div>;
  }
};

export default ProductSection;
