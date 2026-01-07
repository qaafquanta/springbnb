'use client'
import React, { useState } from 'react';
import { Calendar, X } from 'lucide-react';

export default function DatePicker() {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [selectingCheckOut, setSelectingCheckOut] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return date1.toDateString() === date2.toDateString();
  };

  const isInRange = (date) => {
    if (!checkIn || !checkOut) return false;
    return date > checkIn && date < checkOut;
  };

  const isBeforeToday = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateClick = (date) => {
    if (isBeforeToday(date)) return;

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
      setSelectingCheckOut(true);
    } else if (checkIn && !checkOut) {
      if (date > checkIn) {
        setCheckOut(date);
        setSelectingCheckOut(false);
      } else {
        setCheckIn(date);
        setCheckOut(null);
      }
    }
  };

  const renderCalendar = (monthOffset) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, 1);
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(date);
    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-12" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
      const isCheckInDay = isSameDay(currentDate, checkIn);
      const isCheckOutDay = isSameDay(currentDate, checkOut);
      const isInRangeDay = isInRange(currentDate);
      const isPast = isBeforeToday(currentDate);

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(currentDate)}
          disabled={isPast}
          className={`
            h-12 flex items-center justify-center text-sm relative
            ${isPast ? 'text-gray-300 cursor-not-allowed line-through' : 'text-gray-800 hover:border hover:border-gray-900 rounded-full cursor-pointer'}
            ${isCheckInDay || isCheckOutDay ? 'bg-gray-900 text-white rounded-full font-semibold' : ''}
            ${isInRangeDay ? 'bg-gray-100' : ''}
            ${isCheckInDay && isInRangeDay ? 'rounded-r-none' : ''}
            ${isCheckOutDay && isInRangeDay ? 'rounded-l-none' : ''}
          `}
        >
          {day}
        </button>
      );
    }

    return (
      <div className="flex-1 max-w-[320px] min-w-[320px]">
        <div className="text-center font-semibold mb-4">
          {months[date.getMonth()]} {date.getFullYear()}
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
            <div key={day} className="h-10 flex items-center justify-center text-xs font-semibold text-gray-600">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
    );
  };

  const formatDate = (date) => {
    if (!date) return '';
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diffTime = Math.abs(checkOut - checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const clearDates = () => {
    setCheckIn(null);
    setCheckOut(null);
    setSelectingCheckOut(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 pt-20">
            <div className="mb-8">
                <h1 className="text-3xl font-semibold mb-2">Pilih tanggal check-in dan check-out</h1>
                <p className="text-gray-600">Tambahkan tanggal perjalanan Anda untuk mendapatkan harga yang tepat</p>
            </div>

      <div className="border border-gray-300 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-white p-4 border-b border-gray-300 flex items-center justify-between">
          <div className="flex gap-4 flex-1">
            <div className="flex-1">
              <label className="text-xs font-semibold uppercase text-gray-700 mb-1 block">Check-in</label>
              <div className="text-sm text-gray-500">
                {checkIn ? formatDate(checkIn) : 'Tambahkan tanggal'}
              </div>
            </div>
            <div className="flex-1">
              <label className="text-xs font-semibold uppercase text-gray-700 mb-1 block">Check-out</label>
              <div className="text-sm text-gray-500">
                {checkOut ? formatDate(checkOut) : 'Tambahkan tanggal'}
              </div>
            </div>
          </div>
          {(checkIn || checkOut) && (
            <button
              onClick={clearDates}
              className="text-sm underline text-gray-900 font-semibold hover:bg-gray-100 px-3 py-2 rounded-lg"
            >
              Hapus tanggal
            </button>
          )}
        </div>

        <div className="bg-white p-6">
          <div className="flex gap-8 mb-6">
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="flex gap-8 overflow-x-auto">
            {renderCalendar(0)}
            {renderCalendar(1)}
          </div>
        </div>

        {checkIn && checkOut && (
          <div className="bg-gray-50 p-4 border-t border-gray-300 flex items-center justify-between">
            <div>
              <span className="font-semibold">{calculateNights()} malam</span>
              <span className="text-gray-600 ml-2">
                {formatDate(checkIn)} - {formatDate(checkOut)}
              </span>
            </div>
            <button className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-red-600 transition">
              Lanjutkan
            </button>
          </div>
        )}
      </div>

      {!checkIn && (
        <div className="mt-6 flex items-start gap-2 text-sm text-gray-600">
          <Calendar className="w-5 h-5 mt-0.5" />
          <p>Pilih tanggal check-in untuk memulai pemesanan Anda</p>
        </div>
      )}
    </div>
  );
};