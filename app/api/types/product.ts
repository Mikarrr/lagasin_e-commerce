import { Variant } from "./variants";

export interface YoastMetadata {
  title: string;
  description: string;
  robots: {
    index: string;
    follow: string;
    maxSnippet: string;
    maxImagePreview: string;
    maxVideoPreview: string;
  };
  canonical: string;
  ogLocale: string;
  ogType: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogSiteName: string;
  articleModifiedTime: string;
  ogImage: {
    width: number;
    height: number;
    url: string;
    type: string;
  }[];
  twitterCard: string;
  twitterMisc: {
    SzacowanyCzasCzytania: string;
  };
  schema: {
    "@context": string;
    "@graph": Array<{
      "@type": string;
      "@id": string;
      url: string;
      name: string;
      isPartOf: {
        "@id": string;
      };
      primaryImageOfPage: {
        "@id": string;
      };
      image: {
        "@id": string;
      };
      thumbnailUrl: string;
      datePublished: string;
      dateModified: string;
      description: string;
      breadcrumb: {
        "@id": string;
      };
      inLanguage: string;
      potentialAction: Array<{
        "@type": string;
        target: string[];
      }>;
    }>;
  };
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  date_modified: string;
  type: string; // "simple" | "variable" | etc.
  status: string;
  featured: boolean;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string | null;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  images: Array<{
    id: number;
    src: string;
    alt: string;
  }>;
  variants?: Variant[]; // Include variants for variable products
  attributes?: Array<{
    id: number;
    name: string;
    option: string;
  }>; // Opcjonalne dla wariantów
  selectedVariant?: Variant | null; // Optional selected variant
  quantity?: number; // Add quantity for cart purposes
  yoastHeadJson: YoastMetadata; // Yoast metadata added here
}
