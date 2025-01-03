export interface Media {
  source_url: string; // URL oryginalnego obrazu
  sizes: {
    thumbnail: string; // URL miniaturki
    medium: string; // URL średniego rozmiaru
    large: string; // URL dużego rozmiaru
    full: string; // URL pełnego rozmiaru
    medium_large: string; // Opcjonalne medium_large
    woocommerce_thumbnail: string; // URL do obrazu WooCommerce (miniaturka)
    woocommerce_single: string; // URL do obrazu WooCommerce (single)
    woocommerce_gallery_thumbnail: string; // URL do obrazu WooCommerce (gallery)
    [key: string]: string; // Dodatkowe, niestandardowe rozmiary
  };
}
