'use client';

import Link from 'next/link';
import { BiSearch } from 'react-icons/bi';
import { HiMenu } from 'react-icons/hi';
import { FaUserCircle } from 'react-icons/fa';
import {useEffect, useState} from 'react';
import useAuthStore from '@/stores/authStore';
import Calendar from './Calendar';
import PlacePicker from './PlacePicker';
import GuestPicker from './GuestPicker';



const Navbar = () => {
  const user = useAuthStore((s) => s.user);
  const login = useAuthStore((s) => s.login)

  useEffect(()=>{
    const authCheck = async() => {
      try{
        const response = await fetch('http://localhost:8000/auth/auth-check', {
          method: 'GET',
          credentials: "include",
        });
        const data = await response.json();
        login(data.user);
      }catch(err){
        console.log(err);
      }
    }
    authCheck();
  },[])

  const [isCalenderOpened,setIsCalenderOpened] = useState(false);
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();

  const [isPlacePickerOpened, setIsPlacePickerOpened] = useState(false);
  const [place, setPlace] = useState<string>("")

  const [isGuestPickerOpened, setIsGuestPickerOpened] = useState(false);
  const [adults,setAdults] = useState<number>(0);
  const [children,setChildren] = useState<number>(0);

  return (
    <div className="font-sans text-neutral-800 bg-white flex-col justify-center fixed w-full z-10">
      <div className="py-4 border-b-[1px]">
        <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            {/* Logo */}
            <Link href="/" className="cursor-pointer">
              <span className="text-rose-500 font-bold font-sans text-2xl">springbnb</span>
            </Link>

            {/* Search */}
            <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
              <div className="flex flex-row items-center justify-between">
                <button className="text-sm font-semibold px-6"
                  onClick={()=>setIsPlacePickerOpened(prev=>!prev)}
                  >Anywhere</button>
                <button className="hidden sm:block text-sm font-semibold px-6 border-x flex-1 text-center"
                  onClick={()=>setIsCalenderOpened(prev =>! prev)}
                  > {checkIn && checkOut ? `${new Date(checkIn).toLocaleDateString('us-US', { day: '2-digit', month: 'short'})} - ${new Date(checkOut).toLocaleDateString('us-US', { day: '2-digit', month: 'short'})}` : "Anytime"}
                </button>
                <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                  <button className="hidden sm:block" onClick={()=>setIsGuestPickerOpened(prev=>!prev)}>Add guests</button>
                  <div className="p-2 bg-rose-500 rounded-full text-white">
                    <BiSearch size={18} />
                  </div>
                </div>
              </div>
            </div>

            {/* User Menu */}
            <div className="relative">
              <div className="flex flex-row items-center gap-3">
                <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                  Springbnb your home
                </div>
                <div className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                  {/* <HiMenu /> */}
                  {/* <div className="hidden md:block">
                    <FaUserCircle size={24} className="text-gray-500" />
                  </div> */}
                  {user ? 
                  <Link href="/profile"><p className="text-black">{user.name}</p></Link> : 
                  <Link href="/login"><p>Sign In</p></Link>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isCalenderOpened && 
      <div className="fixed inset-x-0 flex justify-center">
          <Calendar checkIn={checkIn} setCheckIn={setCheckIn} checkOut={checkOut} setCheckOut={setCheckOut} />
      </div>
      }{
        isPlacePickerOpened &&
        <div className="fixed inset-x-0 flex justify-center">
          <PlacePicker place={place} setPlace={setPlace} />
        </div>
      }{
        isGuestPickerOpened && 
        <div className="fixed inset-x-0 flex justify-center">
          <GuestPicker adults={adults} setAdults={setAdults} children={children} setChildren={setChildren}/>
        </div>
      }
    </div>
  );
};

export default Navbar;
