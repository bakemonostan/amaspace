import { useQuery } from "@tanstack/react-query";
import { fetchHomePageSections } from "@/lib/sanity/queries/homeSections.queries";

export function useHomePageSections() {
  return useQuery({
    queryKey: ["sanity", "homePage", "sections"],
    queryFn: fetchHomePageSections,
    staleTime: 5 * 60 * 1000,
  });
}
