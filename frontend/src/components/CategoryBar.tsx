'use client';

import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { 
  GiBarn, 
  GiBoatFishing, 
  GiCactus, 
  GiCastle, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiIsland,
  GiWindmill 
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';

const categories = [
  { label: 'Beach', icon: TbBeach },
  { label: 'Windmills', icon: GiWindmill },
  { label: 'Modern', icon: MdOutlineVilla },
  { label: 'Countryside', icon: TbMountain },
  { label: 'Pools', icon: TbPool },
  { label: 'Islands', icon: GiIsland },
  { label: 'Lake', icon: GiBoatFishing },
  { label: 'Skiing', icon: FaSkiing },
  { label: 'Castles', icon: GiCastle },
  { label: 'Caves', icon: GiCaveEntrance },
  { label: 'Camping', icon: GiForestCamp },
  { label: 'Arctic', icon: BsSnow },
  { label: 'Desert', icon: GiCactus },
  { label: 'Barns', icon: GiBarn },
  { label: 'Lux', icon: IoDiamond },
];

const CategoryBar = () => {
  return (
    <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
      {categories.map((item) => (
        <div
          key={item.label}
          className="flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer border-transparent text-neutral-500 hover:border-neutral-800 min-w-fit"
        >
          <item.icon size={26} />
          <div className="font-medium text-xs">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default CategoryBar;
