import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, type ReactNode } from "react";

type HorizontalDragCarouselProps = {
  children: ReactNode;
  "aria-label"?: string;
  className?: string;
};

export function HorizontalDragCarousel({
  children,
  "aria-label": ariaLabel,
  className = "",
}: HorizontalDragCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [grabbing, setGrabbing] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    const onDown = () => setGrabbing(true);
    const onUp = () => setGrabbing(false);
    emblaApi.on("pointerDown", onDown);
    emblaApi.on("pointerUp", onUp);
    return () => {
      emblaApi.off("pointerDown", onDown);
      emblaApi.off("pointerUp", onUp);
    };
  }, [emblaApi]);

  return (
    <section aria-label={ariaLabel} className={className}>
      <div
        ref={emblaRef}
        data-grabbing={grabbing ? "true" : undefined}
        className={`group/carousel overflow-hidden pb-2 select-none ${
          grabbing ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <div className="flex touch-pan-y gap-5 lg:gap-6 [&_*]:cursor-[inherit]">{children}</div>
      </div>
    </section>
  );
}

type HorizontalDragCarouselSlideProps = {
  children: ReactNode;
  className?: string;
};

export function HorizontalDragCarouselSlide({ children, className = "" }: HorizontalDragCarouselSlideProps) {
  return (
    <div
      className={`min-w-0 shrink-0 cursor-grab flex-[0_0_88%] group-data-[grabbing=true]/carousel:cursor-grabbing sm:flex-[0_0_calc((100%-1.25rem)/2)] lg:flex-[0_0_calc((100%-3rem)/3)] ${className}`.trim()}
    >
      {children}
    </div>
  );
}
