'use client';

import Link from 'next/link';
import { BiSearch } from 'react-icons/bi';
import { HiMenu, HiX } from 'react-icons/hi';
import {useEffect, useState} from 'react';
import useAuthStore from '@/stores/authStore';
import { useRouter, usePathname } from 'next/navigation';
import MobileSearchModal from '@/components/navbar-components/MobileSearchModal';
import MobileMenu from '@/components/navbar-components/MobileMenu';

function capitalize(str:string):string {
  if (!str) return ""
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}


const Navbar = () => {
  const pathname = usePathname();
  if (pathname?.startsWith('/dashboard')) return null;

  const user = useAuthStore((s) => s.user);
  const login = useAuthStore((s) => s.login)
  const [categories, setCategories] = useState(null)
  const [cities, setCities] = useState(null)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [mobileSearchStep, setMobileSearchStep] = useState<'where' | 'when' | 'who'>('where');

  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();

  const [city, setCity] = useState<{value:string,label:string} | null>(null)

  const [adults,setAdults] = useState<number>(0);
  const [children,setChildren] = useState<number>(0);
  const [category,setCategory] = useState<string>('');
  const [page,setPage] = useState<number>(1)
  const [propertyName,setPropertyName] = useState<string>('');

  const router = useRouter();

  useEffect(()=>{
    const authCheck = async() => {
      try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/auth-check`, {
          method: 'GET',
          credentials: "include",
        });
        const data = await response.json();
        login(data.user);
      }catch(err){
        console.log(err);
      }
    }
    const fetchSearchInfo = async() => {
      try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/property/search-info`, {
          method: 'GET',
        });
        const data = await response.json();
        setCategories(data.categories);
        setCities(data.cities.map((city:any)=>{
          return {
            value:city.city,
            label:`${capitalize(city.city)} ( ${city._count.city} )`
          }
        }))
      }catch(err){
        console.log(err);
      }
    }
    authCheck();
    fetchSearchInfo();
  },[])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (propertyName) params.set("propertyName", propertyName)
    if (page) params.set("page", page.toString())
    if (city) params.set("city", city.value)
    if (checkIn) params.set("checkIn", formatDate(checkIn))
    if (checkOut) params.set("checkOut", formatDate(checkOut))
    if (category) params.set("categoryId", category)
    if (adults || children) params.set("guests", (adults+children).toString())

    const queryString = params.toString()
    setIsMobileSearchOpen(false);
    setIsMobileMenuOpen(false);

    router.push(queryString ? `/search?${queryString}` : "/search")
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
  }

  return (
    <div className="font-sans text-neutral-800 bg-white flex-col justify-center fixed w-full z-10">
      <div className="py-4 border-b-[1px]">
        <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
          <div className="flex flex-row items-center justify-between gap-2 md:gap-0">
            <Link href="/" className="cursor-pointer flex-shrink-0">
              <span className="text-rose-500 font-bold font-sans text-xl md:text-2xl">Springbnb</span>
            </Link>

            <button 
              className="flex-1 mx-2 border-[1px] py-2 px-4 rounded-full shadow-sm hover:shadow-md transition flex items-center gap-2"
              onClick={() => setIsMobileSearchOpen(true)}
            >
              <BiSearch size={18} className="text-rose-500" />
              <div className="flex flex-col items-start text-left flex-1 min-w-0">
                <span className="text-sm font-semibold truncate w-full">
                  {city ? city.label : "Anywhere"}
                </span>
                <span className="text-xs text-gray-500 truncate w-full">
                  {checkIn && checkOut 
                    ? `${new Date(checkIn).toLocaleDateString('us-US', { day: '2-digit', month: 'short'})} - ${new Date(checkOut).toLocaleDateString('us-US', { day: '2-digit', month: 'short'})}` 
                    : "Anytime"} · {adults + children > 0 ? `${adults + children} guest${adults + children > 1 ? 's' : ''}` : "Add guests"}
                </span>
              </div>
            </button>

            <div className="relative hidden md:flex flex-row items-center gap-3">
              <div className="text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                Springbnb your home
              </div>
              {user?.role === 'TENANT' && (
                <Link href="/dashboard" className="text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                  Dashboard
                </Link>
              )}
              <div className="py-1 px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                {user?.name ? 
                  <Link href="/profile"><p className="text-black">{user.name}</p></Link> : 
                  <Link href="/login"><p>Sign In</p></Link>
                }
              </div>
            </div>

            <div 
              className="md:hidden p-2 border-[1px] border-neutral-200 rounded-full hover:shadow-md transition flex-shrink-0"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <HiX size={20} /> : <HiMenu size={20} />}
            </div>
          </div>
        </div>
      </div>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={closeMobileMenu} 
        user={user} 
      />

      <MobileSearchModal
        isOpen={isMobileSearchOpen}
        onClose={() => {
          setIsMobileSearchOpen(false);
          setMobileSearchStep('where');
        }}
        step={mobileSearchStep}
        setStep={setMobileSearchStep}
        city={city}
        setCity={setCity}
        checkIn={checkIn}
        setCheckIn={setCheckIn}
        checkOut={checkOut}
        setCheckOut={setCheckOut}
        adults={adults}
        setAdults={setAdults}
        children={children}
        setChildren={setChildren}
        category={category}
        setCategory={setCategory}
        propertyName={propertyName}
        setPropertyName={setPropertyName}
        cities={cities}
        categories={categories}
        onSearch={handleSearch}
        onClear={() => {
          setCity(null);
          setCheckIn(undefined);
          setCheckOut(undefined);
          setAdults(0);
          setChildren(0);
        }}
      />
      
      {(isMobileMenuOpen) && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 z-10"
          onClick={closeMobileMenu}
        />
      )}
    </div>
  );
};

export default Navbar;
