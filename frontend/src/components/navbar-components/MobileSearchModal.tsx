'use client';

import { BiSearch } from 'react-icons/bi';
import { HiX } from 'react-icons/hi';
import WhereCard from '@/components/navbar-components/mobile-search-modal/WhereCard';
import WhenCard from '@/components/navbar-components/mobile-search-modal/WhenCard';
import WhoCard from '@/components/navbar-components/mobile-search-modal/WhoCard';

interface MobileSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  step: 'where' | 'when' | 'who';
  setStep: (step: 'where' | 'when' | 'who') => void;
  city: any;
  setCity: (city: any) => void;
  checkIn: Date | undefined;
  setCheckIn: (date: Date | undefined) => void;
  checkOut: Date | undefined;
  setCheckOut: (date: Date | undefined) => void;
  adults: number;
  setAdults: (n: number) => void;
  children: number;
  setChildren: (n: number) => void;
  category: string;
  setCategory: (s: string) => void;
  propertyName: string;
  setPropertyName: (s: string) => void;
  cities: any[] | null;
  categories: any[] | null;
  onSearch: () => void;
  onClear: () => void;
  sortBy: 'name' | 'price';
  setSortBy: (s: 'name' | 'price') => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (s: 'asc' | 'desc') => void;
}

const MobileSearchModal = ({
  isOpen,
  onClose,
  step,
  setStep,
  city,
  setCity,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  adults,
  setAdults,
  children,
  setChildren,
  category,
  setCategory,
  propertyName,
  setPropertyName,
  cities,
  categories,
  onSearch,
  onClear,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder
}: MobileSearchModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full h-full md:h-auto md:max-h-[90vh] md:w-full md:max-w-xl bg-neutral-50 md:rounded-2xl md:shadow-2xl flex flex-col overflow-hidden md:my-4">

      <div className="bg-white border-b border-neutral-200 px-4 py-3 flex items-center justify-between">
        <button 
          onClick={onClose}
          className="p-2 -ml-2 hover:bg-neutral-100 rounded-full transition"
        >
          <HiX size={24} />
        </button>
        <div className="flex gap-4">
          <div className="text-sm font-medium text-neutral-900 border-b-2 border-neutral-900 pb-1">
            Stays
          </div>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <WhereCard 
          step={step}
          setStep={setStep}
          city={city}
          setCity={setCity}
          cities={cities}
        />

        <WhenCard 
          step={step}
          setStep={setStep}
          checkIn={checkIn}
          setCheckIn={setCheckIn}
          checkOut={checkOut}
          setCheckOut={setCheckOut}
        />

        <WhoCard 
          step={step}
          setStep={setStep}
          adults={adults}
          setAdults={setAdults}
          children={children}
          setChildren={setChildren}
        />

        <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] mb-3 overflow-hidden transition-all duration-300">
          <select 
            className="w-full p-5 outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] mb-3 overflow-hidden transition-all duration-300">
          <input 
            type="text" 
            className="w-full p-5 outline-none" 
            placeholder="Search by property name" 
            value={propertyName} 
            onChange={(e) => setPropertyName(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] mb-3 p-5 overflow-hidden transition-all duration-300">
           <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                 <label className="text-sm font-semibold text-neutral-600">Sort By</label>
                 <div className="flex gap-2">
                    <button
                      onClick={() => setSortBy('name')}
                      className={`flex-1 py-2 rounded-lg border text-sm font-medium transition ${sortBy === 'name' ? 'border-rose-500 bg-rose-50 text-rose-500' : 'border-neutral-200 hover:border-neutral-300'}`}
                    >
                      Name
                    </button>
                    <button
                      onClick={() => setSortBy('price')}
                       className={`flex-1 py-2 rounded-lg border text-sm font-medium transition ${sortBy === 'price' ? 'border-rose-500 bg-rose-50 text-rose-500' : 'border-neutral-200 hover:border-neutral-300'}`}
                    >
                      Price
                    </button>
                 </div>
              </div>

              <div className="flex flex-col gap-2">
                 <label className="text-sm font-semibold text-neutral-600">Order</label>
                 <div className="flex gap-2">
                    <button
                      onClick={() => setSortOrder('asc')}
                      className={`flex-1 py-2 rounded-lg border text-sm font-medium transition ${sortOrder === 'asc' ? 'border-rose-500 bg-rose-50 text-rose-500' : 'border-neutral-200 hover:border-neutral-300'}`}
                    >
                      {sortBy === 'price' ? 'Low to High' : 'A - Z'}
                    </button>
                    <button
                      onClick={() => setSortOrder('desc')}
                       className={`flex-1 py-2 rounded-lg border text-sm font-medium transition ${sortOrder === 'desc' ? 'border-rose-500 bg-rose-50 text-rose-500' : 'border-neutral-200 hover:border-neutral-300'}`}
                    >
                       {sortBy === 'price' ? 'High to Low' : 'Z - A'}
                    </button>
                 </div>
              </div>
           </div>
        </div>

      </div>

      <div className="bg-white border-t border-neutral-200 p-4 flex items-center justify-between gap-4">
        <button 
          onClick={onClear}
          className="text-neutral-900 font-medium underline"
        >
          Clear all
        </button>
        <button 
          onClick={onSearch}
          className="flex-1 py-3.5 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25"
        >
          <BiSearch size={20} />
          Search
        </button>
      </div>
      </div>
    </div>
  );
};

export default MobileSearchModal;
