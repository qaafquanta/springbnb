'use client'
import { useState } from "react";

const MobileCalendar = ({ checkIn, setCheckIn, checkOut, setCheckOut, onComplete }: {
  checkIn?: Date;
  setCheckIn: (date?: Date) => void;
  checkOut?: Date;
  setCheckOut: (date?: Date) => void;
  onComplete?: () => void;
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectingCheckOut, setSelectingCheckOut] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    return { daysInMonth, startingDayOfWeek };
  };

  const isSameDay = (date1?: Date, date2?: Date) => {
    if (!date1 || !date2) return false;
    return date1.toDateString() === date2.toDateString();
  };

  const isInRange = (date: Date) => {
    if (!checkIn || !checkOut) return false;
    return date > checkIn && date < checkOut;
  };

  const isBeforeToday = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateClick = (date: Date) => {
    if (isBeforeToday(date)) return;

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(undefined);
      setSelectingCheckOut(true);
    } else if (checkIn && !checkOut) {
      if (date > checkIn) {
        setCheckOut(date);
        setSelectingCheckOut(false);
        if (onComplete) onComplete();
      } else {
        setCheckIn(date);
        setCheckOut(undefined);
      }
    }
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
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
            h-10 w-10 mx-auto flex items-center justify-center text-sm rounded-full transition-all
            ${isPast ? 'text-neutral-300 cursor-not-allowed' : 'text-neutral-900 hover:bg-neutral-100 cursor-pointer'}
            ${isCheckInDay || isCheckOutDay ? 'bg-neutral-900 text-white font-semibold' : ''}
            ${isInRangeDay ? 'bg-neutral-100' : ''}
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
          className="p-2 hover:bg-neutral-100 rounded-full transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="font-semibold text-neutral-900">
          {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
          className="p-2 hover:bg-neutral-100 rounded-full transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
          <div key={idx} className="h-10 flex items-center justify-center text-xs font-semibold text-neutral-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {renderCalendar()}
      </div>

      {(checkIn || checkOut) && (
        <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
          <div className="text-sm">
            <span className="text-neutral-500">Check-in: </span>
            <span className="font-medium text-neutral-900">
              {checkIn ? checkIn.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) : 'Select'}
            </span>
            <span className="text-neutral-300 mx-2">→</span>
            <span className="text-neutral-500">Check-out: </span>
            <span className="font-medium text-neutral-900">
              {checkOut ? checkOut.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) : 'Select'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileCalendar;