'use client'
import Navbar from "@/components/Navbar";
import CategoryBar from "@/components/CategoryBar";
import ListingCard from "@/components/ListingCard";
import Footer from "@/components/Footer";
import { useEffect ,useState} from "react";
export default function Home() {
  const listingx = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    imageSrc: `https://picsum.photos/seed/${i + 10}/600/600`, // Placeholder images
    location: `Location ${i + 1}`,
    distance: `${(i + 1) * 100} kilometers away`,
    date: "Oct 12-17",
    price: (i + 1) * 23092,
    rating: 4.8 + (i % 3) * 0.1,
  }));

  const [listings,setListings] = useState(null)

  useEffect(()=>{
    const fetchListings = async()=>{
      const response = await fetch('http://localhost:8000/property/properties?page=1&limit=10')
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
          <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings? listings.map((listing) => (
              <ListingCard
                key={listing.id}
                imageSrc={listing.images[0]}
                city={listing.city}
                category={listing.category.name}
                // distance={listing.distance}
                // date={listing.date}
                price={listing.price}
                rating={listing.rating}
              />
            )) : <div></div>
          }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
