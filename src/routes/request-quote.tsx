import { createFileRoute } from "@tanstack/react-router";
import { RequestQuoteScreen } from "@/features/quote";

export const Route = createFileRoute("/request-quote")({
  component: RequestQuoteScreen,
});
