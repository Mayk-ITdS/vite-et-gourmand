import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect } from "react";
import AvisCard from "./AvisCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchReviews } from "@/store/slices/reviews";

export default function AvisCarousel() {
  const dispatch = useAppDispatch();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    ],
  );
  useEffect(() => {
    dispatch(fetchReviews()).unwrap();
  }, []);
  const avis = useAppSelector((state) => state.reviews.data);
  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative w-[60%]">
      <button
        onClick={scrollPrev}
        className="
          hidden md:flex
          absolute left-[-60px] top-1/2 -translate-y-1/2
          h-12 w-12 items-center justify-center
          rounded-full
          bg-white/10 backdrop-blur
          border border-white/20
          hover:bg-white/20
          transition
        "
        aria-label="Précédent"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={scrollNext}
        className="
          hidden md:flex
          absolute right-[-60px] top-1/2 -translate-y-1/2
          h-12 w-12 items-center justify-center
          rounded-full
          bg-white/10 backdrop-blur
          border border-white/20
          hover:bg-white/20
          transition
        "
        aria-label="Suivant"
      >
        <ChevronRight />
      </button>
      <div
        ref={emblaRef}
        className="overflow-hidden"
      >
        <div className="flex gap-3">
          {avis.map((avi, index) => (
            <div
              key={index}
              className="
                flex-[0_0_100%]
                sm:flex-[0_0_50%]
                md:flex-[0_0_33%]
              "
            >
              <AvisCard avis={avi} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
