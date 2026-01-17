'use client';

import { BiSearch } from 'react-icons/bi';
import { HiX } from 'react-icons/hi';
import { MdOutlineHomeWork } from 'react-icons/md';

function capitalize(str: string) {
  if (!str) return ""
  return str.charAt(0).toUpperCase() + str.slice(1)
}

interface WhereCardProps {
  step: 'where' | 'when' | 'who';
  setStep: (step: 'where' | 'when' | 'who') => void;
  city: any;
  setCity: (city: any) => void;
  cities: any[] | null;
}

const WhereCard = ({ step, setStep, city, setCity, cities }: WhereCardProps) => {
  return (
    <div 
      className={`bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] mb-3 overflow-hidden transition-all duration-300 ${
        step === 'where' ? 'ring-2 ring-neutral-900' : ''
      }`}
    >
      <button 
        onClick={() => setStep('where')}
        className="w-full p-5 text-left"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">Where</p>
            <p className={`text-base ${city ? 'text-neutral-900 font-medium' : 'text-neutral-400'}`}>
              {city ? city.label : "Search destinations"}
            </p>
          </div>
          {city && (
            <button 
              onClick={(e) => { e.stopPropagation(); setCity(null); }}
              className="p-1.5 hover:bg-neutral-100 rounded-full"
            >
              <HiX size={16} className="text-neutral-400" />
            </button>
          )}
        </div>
      </button>
      
      {step === 'where' && (
        <div className="px-5 pb-5 border-t border-neutral-100">
          <div className="relative mt-4">
            <BiSearch size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search destinations"
              className="w-full pl-12 pr-4 py-3 bg-neutral-100 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-neutral-900"
              onChange={(e) => {
                const filtered = cities?.find(c => 
                  c.label.toLowerCase().includes(e.target.value.toLowerCase())
                );
                if (filtered) setCity(filtered);
              }}
            />
          </div>
          
          <div className="mt-4">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">Popular destinations</p>
            <div className="grid grid-cols-2 gap-2">
              {cities?.slice(0, 6).map((c: any) => (
                <button
                  key={c.value}
                  onClick={() => {
                    setCity(c);
                    setStep('when');
                  }}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    city?.value === c.value 
                      ? 'border-neutral-900 bg-neutral-50' 
                      : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <div className="w-10 h-10 bg-neutral-50 rounded-lg flex items-center justify-center">
                    <MdOutlineHomeWork size={20} className="text-rose-500"/>
                  </div>
                  <span className="text-sm font-medium text-neutral-900 truncate">
                    {capitalize(c.value)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhereCard;
