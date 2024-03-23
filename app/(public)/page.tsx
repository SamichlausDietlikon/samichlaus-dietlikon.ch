"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export default function Home() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div>
      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "start",
        }}
        className="w-[960px] m-auto mt-12 rounded-lg"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {[...Array(6).keys()].map((i) => (
            <CarouselItem>
              <Image
                src={`/images/${i + 1}.jpg`}
                alt={`Samichlaus Dietlikon Bild ${i + 1}`}
                width={960}
                height={400}
                className="rounded-lg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
