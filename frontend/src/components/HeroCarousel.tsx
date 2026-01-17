'use client'

import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel"

interface HeroSlide {
  id: number
  image: string
  title?: string
  subtitle?: string
}

const defaultSlides: HeroSlide[] = [
  {
    id: 1,
    image: "/house1.png",
    title: "Find Your Dream Stay",
    subtitle: "Discover the best accommodations for your perfect getaway",
  },
  {
    id: 2,
    image: "/house2.png",
    title: "Explore New Destinations",
    subtitle: "From exotic beaches to breathtaking mountains",
  },
  {
    id: 3,
    image: "/house3.png",
    title: "Unforgettable Experiences",
    subtitle: "Enjoy the comfort of feeling right at home",
  },
]

interface HeroCarouselProps {
  slides?: HeroSlide[]
  autoPlay?: boolean
  autoPlayInterval?: number
}

export default function HeroCarousel({
  slides = defaultSlides,
  autoPlay = true,
  autoPlayInterval = 5000,
}: HeroCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  React.useEffect(() => {
    if (!api || !autoPlay) return

    const interval = setInterval(() => {
      api.scrollNext()
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [api, autoPlay, autoPlayInterval])

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full overflow-hidden rounded-2xl">
                <img
                  src={slide.image}
                  alt={slide.title || `Slide ${slide.id}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {(slide.title || slide.subtitle) && (
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12 text-white">
                    {slide.title && (
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                        {slide.title}
                      </h2>
                    )}
                    {slide.subtitle && (
                      <p className="text-sm sm:text-base md:text-lg text-white/90">
                        {slide.subtitle}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4 bg-white/80 hover:bg-white border-none shadow-lg" />
        <CarouselNext className="right-4 bg-white/80 hover:bg-white border-none shadow-lg" />
      </Carousel>
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-rose-500 w-6"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
