export interface Post {
  id: number;
  slug: string;
  date: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  link: string;
  categories: number[];
  featured_media: Media | null;
  _embedded: {
    "wp:featuredmedia": Media[];
  };
  yoast_head_json: YoastSeoData | null | undefined;
}

export interface Media {
  id: number;
  date: string;
  slug: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  source_url: string;
  width: number;
  height: number;
  mime_type: string;
  media_details?: {
    sizes: {
      thumbnail: {
        source_url: string;
        width: number;
        height: number;
      };
      medium: {
        source_url: string;
        width: number;
        height: number;
      };
      full: {
        source_url: string;
        width: number;
        height: number;
      };
    };
  };
}

export interface YoastSeoData {
  title: string;
  description: string;
  canonical: string;
  og_title: string;
  og_description: string;
  og_url: string;
  og_site_name: string;
  og_type: string;
  og_image: Array<{
    url: string;
    width: number;
    height: number;
    type: string;
  }>;
  twitter_card: string;
  article_published_time: string;
  article_modified_time: string;
  author: string;
  twitter_misc: {
    [key: string]: string;
  };
}
