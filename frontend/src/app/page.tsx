'use client'
import ListingCard from "@/components/ListingCard";
import HeroCarousel from "@/components/HeroCarousel";
import { useEffect ,useState} from "react";
export default function Home() {

type Listing = {
  id: string;
  images: string[];
  city: string;
  category: { name: string };
  roomTypes: { basePrice: number }[];
}

  const [listings, setListings] = useState<Listing[] | null>(null)

  useEffect(()=>{
    const fetchListings = async()=>{
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/property/properties?page=1&limit=10`)
      const data = await response.json()
      console.log(data)
      setListings(data.result)
    }
    fetchListings()
  },[])

  return (
    <div className="flex flex-col min-h-screen font-sans text-neutral-800 bg-white">
      <div className="pt-24 pb-20">
        <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
          <div>
            <HeroCarousel />
          </div>
          <h1 className="text-3xl font-semibold text-start py-10">Get Your Accommodation</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings? listings.map((listing: { id: string; images: string[]; city: string; category: { name: string }; roomTypes: { basePrice: number }[] }) => (
              <ListingCard
                key={listing.id}
                imageSrc={listing.images[0]}
                city={listing.city}
                category={listing.category.name}
                price={listing.roomTypes?.[0]?.basePrice || 0}
              />
            )) : <div></div>
          }
          </div>
        </div>
      </div>
    </div>
  );
}
