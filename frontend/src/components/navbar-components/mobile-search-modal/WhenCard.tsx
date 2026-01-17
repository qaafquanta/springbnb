'use client';

import { HiX } from 'react-icons/hi';
import MobileCalendar from '@/components/navbar-components/MobileCalendar';

interface WhenCardProps {
  step: 'where' | 'when' | 'who';
  setStep: (step: 'where' | 'when' | 'who') => void;
  checkIn: Date | undefined;
  setCheckIn: (date: Date | undefined) => void;
  checkOut: Date | undefined;
  setCheckOut: (date: Date | undefined) => void;
}

const WhenCard = ({ 
  step, 
  setStep, 
  checkIn, 
  setCheckIn, 
  checkOut, 
  setCheckOut 
}: WhenCardProps) => {
  return (
    <div 
      className={`bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] mb-3 overflow-hidden transition-all duration-300 ${
        step === 'when' ? 'ring-2 ring-neutral-900' : ''
      }`}
    >
      <button 
        onClick={() => setStep('when')}
        className="w-full p-5 text-left"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">When</p>
            <p className={`text-base ${checkIn && checkOut ? 'text-neutral-900 font-medium' : 'text-neutral-400'}`}>
              {checkIn && checkOut 
                ? `${new Date(checkIn).toLocaleDateString('en-US', { day: 'numeric', month: 'short'})} - ${new Date(checkOut).toLocaleDateString('en-US', { day: 'numeric', month: 'short'})}`
                : "Add dates"}
            </p>
          </div>
          {(checkIn || checkOut) && (
            <button 
              onClick={(e) => { e.stopPropagation(); setCheckIn(undefined); setCheckOut(undefined); }}
              className="p-1.5 hover:bg-neutral-100 rounded-full"
            >
              <HiX size={16} className="text-neutral-400" />
            </button>
          )}
        </div>
      </button>
      
      {step === 'when' && (
        <div className="px-3 pb-5 border-t border-neutral-100">
          <div className="mt-4">
            <MobileCalendar 
              checkIn={checkIn} 
              setCheckIn={setCheckIn} 
              checkOut={checkOut} 
              setCheckOut={setCheckOut}
              onComplete={() => setStep('who')}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WhenCard;
