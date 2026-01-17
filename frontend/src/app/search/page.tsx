'use client'
import { useEffect,useState } from "react";
import { useSearchParams } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";
import PaginationButton from "@/components/PaginationButton"
export default function SearchPage(){
    const searchParams = useSearchParams()
    console.log(searchParams)
    const [listings,setListings] = useState<any>(null)
    const [page,setPage] = useState(1)
    const [totalPages,setTotalPages] = useState(6)
    const [filterData, setFilterData] = useState({
      city: '',
      checkIn: '',
      checkOut: '',
      guests: 1,
      category: '',
      propertyName: ''
    })
    useEffect(()=>{
        const fetchProperties = async()=>{
            const queryString = new URLSearchParams(searchParams.toString())
            queryString.set('page', page.toString())
            const properties = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/property/filter-all-properties?`+queryString.toString())
            const data = await properties.json()
            console.log(data)
            setFilterData(data.filterData)
            setListings(data.result)
            setTotalPages(data.pagination.totalPages)
        }
        fetchProperties()
    },[searchParams, page])
    return(
        <div className="flex flex-col min-h-screen font-sans text-neutral-800 bg-white">
      <div className="pt-24 pb-20">
        <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 gap-10 flex flex-col">
          {filterData && (
            <div className="text-neutral-700">
              <p className="text-lg">
                <span className="font-semibold text-neutral-900">
                  Showing {listings?.length || 0} {filterData.category ? filterData.category : (listings?.length === 1 ? 'property' : 'properties')}
                </span>
                {filterData.city && (
                  <span> in <span className="font-medium text-neutral-900">{filterData.city}</span></span>
                )}
                {filterData.checkIn && filterData.checkOut && (
                  <span> from <span className="font-medium">{new Date(filterData.checkIn).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</span> to <span className="font-medium">{new Date(filterData.checkOut).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</span></span>
                )}
                {filterData.guests > 0 && (
                  <span> · <span className="font-medium">{filterData.guests} {filterData.guests === 1 ? 'guest' : 'guests'}</span></span>
                )}
                {filterData.propertyName && (
                  <span> · search: "<span className="font-medium italic">{filterData.propertyName}</span>"</span>
                )}
              </p>
            </div>
          )}
          <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings? listings.map((listing:any) => (
              <PropertyCard
                key={listing.id}
                id={listing.id}
                imageSrc={listing.images[0]}
                city={listing.city}
                propertyName={listing.name}
                category={listing.category.name}
                price={listing.roomTypes?.[0]?.basePrice}
                finalPrice={listing.roomTypes?.[0]?.finalPrice}
                nights={listing.roomTypes?.[0]?.nights}
                checkIn={filterData.checkIn}
                checkOut={filterData.checkOut}
                rating={listing.rating}
              />
            )) : <div></div>
          }
          </div>
          <div className="w-full h-10 flex justify-center items-center gap-5 font-semibold">
            <PaginationButton setPage={setPage} page={page} totalPages={totalPages}/>
          </div>
        </div>
      </div>
    </div>
    )
} 