'use client';

import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';

interface ListingCardProps {
  imageSrc: string;
  city: string;
  price?: number;
  rating?: number;
  category: string
}

const ListingCard: React.FC<ListingCardProps> = ({
  imageSrc,
  city,
  price,
  rating,
  category
}) => {
  return (
    <div className="col-span-1 cursor-pointer group">
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
        <div className="flex flex-row items-center gap-1 opacity-60 font-medium text-sm">
          <div className="">{price ? `Rp${price.toLocaleString("id-ID")}` : "-"} / night</div>
          <div className="opacity-50">・</div>
          <div className="flex flex-row items-center gap-1">
            <AiFillStar size={10} />
            <span className="">{rating? Math.round(rating*10)/10 : "4.1"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
