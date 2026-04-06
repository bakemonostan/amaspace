import { createFileRoute } from "@tanstack/react-router";
import { ProductCategoryScreen } from "@/features/products";

export const Route = createFileRoute("/products/$categorySlug/")({
  component: ProductCategoryScreen,
});
