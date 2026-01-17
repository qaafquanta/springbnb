'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';

interface ListingCardProps {
  id: string;
  imageSrc: string;
  city: string;
  propertyName?: string;
  price?: number;
  finalPrice?: number;
  nights?: number;
  checkIn?: string;
  checkOut?: string;
  rating?: number;
  category: string
}

const ListingCard: React.FC<ListingCardProps> = ({
  id,
  imageSrc,
  city,
  propertyName,
  price,
  finalPrice,
  nights = 1,
  checkIn,
  checkOut,
  rating,
  category
}) => {
  const queryParams = new URLSearchParams();
  if (checkIn) queryParams.set('checkIn', checkIn);
  if (checkOut) queryParams.set('checkOut', checkOut);
  const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
  
  return (
    <Link href={`/property/${id}${queryString}`} className="col-span-1 cursor-pointer group">
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            alt="Listing"
            src={imageSrc}
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <FaHeart size={24} className="text-white/70 hover:text-white transition" />
          </div>
        </div>
        <div className="font-semibold text-lg flex flex-row items-center justify-between">
          <div>{category[0].toUpperCase()+category.slice(1).toLowerCase()} in {city}</div>   
        </div>
        {propertyName && (
          <div className="text-sm font-normal text-neutral-500 truncate">{propertyName}</div>
        )}
        <div className="flex flex-row items-center gap-1 opacity-60 font-medium text-sm">
          <div className="">Rp{finalPrice ? Math.round(Number(finalPrice)).toLocaleString("en-US") : (price ? Math.round(Number(price)).toLocaleString("en-US") : "329,648")} for {nights} night{nights > 1 ? 's' : ''}</div>
          <div className="opacity-50">・</div>
          <div className="flex flex-row items-center gap-1">
            <AiFillStar size={10} />
            <span className="">{rating? Math.round(Number(rating)*10)/10 : "4.1"}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
