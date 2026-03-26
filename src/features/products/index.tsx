import { BasicPage } from "@/features/common/BasicPage";

export function ProductsScreen() {
  return <BasicPage title="Product Catalogue" sub="Reference catalogue by category." />;
}

export function ProductCategoryScreen() {
  return <BasicPage title="Product Category" sub="Products filtered by selected category." />;
}

export function ProductDetailScreen() {
  return <BasicPage title="Product Detail" sub="Specs, gallery, and related products." />;
}
