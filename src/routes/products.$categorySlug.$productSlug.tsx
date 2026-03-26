import { createFileRoute } from "@tanstack/react-router";
import { ProductDetailScreen } from "@/features/products";

export const Route = createFileRoute("/products/$categorySlug/$productSlug")({
  component: ProductDetailScreen,
});
