'use client';

interface WhoCardProps {
  step: 'where' | 'when' | 'who';
  setStep: (step: 'where' | 'when' | 'who') => void;
  adults: number;
  setAdults: (n: number) => void;
  children: number;
  setChildren: (n: number) => void;
}

const WhoCard = ({ 
  step, 
  setStep, 
  adults, 
  setAdults, 
  children, 
  setChildren 
}: WhoCardProps) => {
  return (
    <div 
      className={`bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] mb-3 overflow-hidden transition-all duration-300 ${
        step === 'who' ? 'ring-2 ring-neutral-900' : ''
      }`}
    >
      <button 
        onClick={() => setStep('who')}
        className="w-full p-5 text-left"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">Who</p>
            <p className={`text-base ${adults + children > 0 ? 'text-neutral-900 font-medium' : 'text-neutral-400'}`}>
              {adults + children > 0 
                ? `${adults + children} guest${adults + children > 1 ? 's' : ''}`
                : "Add guests"}
            </p>
          </div>
        </div>
      </button>
      
      {step === 'who' && (
        <div className="px-5 pb-5 border-t border-neutral-100">
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-neutral-100">
              <div>
                <p className="font-medium text-neutral-900">Adults</p>
                <p className="text-sm text-neutral-500">Ages 13 or above</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setAdults(Math.max(0, adults - 1))}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition ${
                    adults === 0 ? 'border-neutral-200 text-neutral-300' : 'border-neutral-400 text-neutral-600 hover:border-neutral-900'
                  }`}
                  disabled={adults === 0}
                >
                  <span className="text-lg">−</span>
                </button>
                <span className="w-6 text-center font-medium">{adults}</span>
                <button 
                  onClick={() => setAdults(adults + 1)}
                  className="w-8 h-8 rounded-full border border-neutral-400 text-neutral-600 hover:border-neutral-900 flex items-center justify-center transition"
                >
                  <span className="text-lg">+</span>
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-neutral-900">Children</p>
                <p className="text-sm text-neutral-500">Ages 2-12</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setChildren(Math.max(0, children - 1))}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition ${
                    children === 0 ? 'border-neutral-200 text-neutral-300' : 'border-neutral-400 text-neutral-600 hover:border-neutral-900'
                  }`}
                  disabled={children === 0}
                >
                  <span className="text-lg">−</span>
                </button>
                <span className="w-6 text-center font-medium">{children}</span>
                <button 
                  onClick={() => setChildren(children + 1)}
                  className="w-8 h-8 rounded-full border border-neutral-400 text-neutral-600 hover:border-neutral-900 flex items-center justify-center transition"
                >
                  <span className="text-lg">+</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhoCard;
