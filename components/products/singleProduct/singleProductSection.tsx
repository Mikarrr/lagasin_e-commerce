import { Product } from "@/app/api/types/product";
import { Variant } from "@/app/api/types/variants";
import React from "react";
import SingleProductContent from "./singleProductContent";
import MoreProductSection from "../moreProduct/MoreProduct";
import FaqSection from "@/components/utils/faq/faq";

interface SingleProductPageProps {
  product: Product;
  variants: Variant[];
  mainCategory: string | undefined;
}

const SingleProductSection: React.FC<SingleProductPageProps> = ({
  product,
  variants,
  mainCategory,
}) => {
  return (
    <main>
      <SingleProductContent product={product} variants={variants} />
      <MoreProductSection categorySlug={mainCategory} />
      <FaqSection />
    </main>
  );
};

export default SingleProductSection;
