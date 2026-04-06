import { createFileRoute } from "@tanstack/react-router";
import { ProductsScreen } from "@/features/products";

export const Route = createFileRoute("/products/")({
  component: ProductsScreen,
});
