import { NextResponse } from "next/server";
import { Product } from "@/app/api/types/product";
import { Variant } from "@/app/api/types/variants";

export async function GET() {
  let allProducts: Product[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const response = await fetch(
      `${process.env.WORDPRESS_API_URL}/wp-json/wc/v3/products?consumer_key=${process.env.WOO_API_CONSUMER}&consumer_secret=${process.env.WOO_API_SECRET}&per_page=${perPage}&page=${page}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: response.status }
      );
    }

    const products: Product[] = await response.json();

    if (products.length === 0) {
      break;
    }

    for (const product of products) {
      if (product.type === "variable") {
        const variantsResponse = await fetch(
          `${process.env.WORDPRESS_API_URL}/wp-json/wc/v3/products/${product.id}/variations?consumer_key=${process.env.WOO_API_CONSUMER}&consumer_secret=${process.env.WOO_API_SECRET}`,
          { cache: "no-store" }
        );

        if (variantsResponse.ok) {
          const variants: Variant[] = await variantsResponse.json();

          const uniqueColorVariants = Object.values(
            variants.reduce<Record<string, Variant>>((acc, variant) => {
              const colorAttribute = variant.attributes.find(
                (attr) => attr.name.toLowerCase() === "color"
              );
              if (colorAttribute && !acc[colorAttribute.option]) {
                acc[colorAttribute.option] = variant;
              }
              return acc;
            }, {})
          );

          if (uniqueColorVariants.length > 0) {
            allProducts = allProducts.concat(
              uniqueColorVariants.map((variant) => {
                const variantImages = variant.image
                  ? [
                      {
                        id: variant.image.id,
                        src: variant.image.src,
                        alt: variant.image.alt,
                      },
                    ]
                  : product.images;

                return {
                  ...variant,
                  name: `${product.name} - ${variant.attributes
                    ?.filter((attr) => attr.name.toLowerCase() === "color")
                    .map((attr) => attr.option)
                    .join(", ")}`,
                  slug: product.slug,
                  permalink: variant.permalink,
                  date_created: variant.date_created,
                  date_modified: variant.date_modified,
                  description: variant.description,
                  type: "variation",
                  status: variant.status,
                  featured: product.featured,
                  short_description: product.short_description,
                  categories: product.categories,
                  images: variantImages,
                  price: variant.price,
                  regular_price: variant.regular_price,
                  sale_price: variant.sale_price,
                  attributes: variant.attributes,
                } as Product;
              })
            );
          } else {
            allProducts.push({
              ...product,
              name: product.name,
              images: product.images,
              attributes: [],
            });
          }
        } else {
          console.error(
            `Failed to fetch variants for product ${product.id}: ${variantsResponse.statusText}`
          );
        }
      } else {
        allProducts.push(product);
      }
    }

    page++;
  }

  return NextResponse.json(allProducts);
}
