'use client';

import { useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';

type CalendarAvailability = {
    date: string
    available: number
    total: number
}

interface DashboardCalendarProps {
    calendarAvailability: CalendarAvailability[];
    totalRooms: number;
}

const DashboardCalendar = ({ calendarAvailability, totalRooms }: DashboardCalendarProps) => {
    const availabilityMap = useMemo(() => {
        const map: Record<string, { available: number; total: number }> = {}
        calendarAvailability.forEach(item => {
            map[item.date] = { available: item.available, total: item.total }
        })
        return map
    }, [calendarAvailability])

    const todayStr = useMemo(() => {
        const today = new Date()
        return today.toISOString().split('T')[0]
    }, [])

    return (
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden h-fit">
            <div className="flex justify-between items-center px-5 py-4">
                <h2 className="font-semibold text-lg text-neutral-800">Room Availability</h2>
                <Link href="/dashboard/room-availability" className="text-rose-500 text-sm font-medium flex items-center gap-1 hover:underline">
                    Manage <FaArrowRight size={12} />
                </Link>
            </div>
            <div className="px-4 pb-4">
                <style jsx global>{`
                    .fc {
                        font-family: inherit;
                        font-size: 0.85rem;
                    }
                    .fc .fc-toolbar {
                        margin-bottom: 0.75rem !important;
                    }
                    .fc .fc-toolbar-title {
                        font-size: 1rem;
                        font-weight: 600;
                    }
                    .fc .fc-button {
                        padding: 0.25rem 0.5rem;
                        font-size: 0.75rem;
                    }
                    .fc .fc-button-primary {
                        background-color: #f43f5e;
                        border-color: #f43f5e;
                    }
                    .fc .fc-button-primary:hover {
                        background-color: #e11d48;
                        border-color: #e11d48;
                    }
                    .fc .fc-button-primary:disabled {
                        background-color: #fda4af;
                        border-color: #fda4af;
                    }
                    .fc table {
                        border: none !important;
                    }
                    .fc th, .fc td {
                        border: none !important;
                    }
                    .fc .fc-scrollgrid {
                        border: none !important;
                    }
                    .fc .fc-scrollgrid-section > td {
                        border: none !important;
                    }
                    .fc .fc-col-header-cell {
                        padding: 0.5rem 0;
                        font-weight: 500;
                        font-size: 0.7rem;
                        color: #9ca3af;
                        text-transform: uppercase;
                    }
                    .fc .fc-daygrid-day {
                        cursor: pointer;
                    }
                    .fc .fc-daygrid-day-frame {
                        min-height: 50px !important;
                    }
                    .fc .fc-daygrid-day.fc-day-past {
                        opacity: 0.35;
                        pointer-events: none;
                    }
                    .fc .fc-daygrid-day-number {
                        font-weight: 500;
                        padding: 2px 6px;
                        font-size: 0.8rem;
                    }
                    .fc .fc-daygrid-day-top {
                        flex-direction: row;
                        justify-content: center;
                    }
                    .fc .fc-daygrid-day-events {
                        display: none;
                    }
                    .fc-day-today {
                        background-color: transparent !important;
                    }
                    .fc-day-today .fc-daygrid-day-number {
                        background-color: #f43f5e;
                        color: white;
                        border-radius: 50%;
                        width: 24px;
                        height: 24px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .availability-badge {
                        font-size: 9px;
                        font-weight: 700;
                        padding: 1px 5px;
                        border-radius: 9999px;
                        text-align: center;
                        margin: 1px auto;
                    }
                `}</style>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev',
                        center: 'title',
                        right: 'next'
                    }}
                    height="auto"
                    fixedWeekCount={false}
                    dayCellContent={(arg) => {
                        const dateStr = arg.date.toISOString().split('T')[0]
                        const availability = availabilityMap[dateStr as string]
                        
                        const available = availability ? availability.available : totalRooms
                        const total = availability ? availability.total : totalRooms
                        const isPast = dateStr < todayStr
                        
                        let bgColor = '#d1fae5'
                        let textColor = '#047857'
                        
                        if (total > 0 && !isPast) {
                            const percentage = available / total
                            if (percentage >= 0.75) { bgColor = '#d1fae5'; textColor = '#047857' }
                            else if (percentage >= 0.5) { bgColor = '#ecfccb'; textColor = '#4d7c0f' }
                            else if (percentage >= 0.25) { bgColor = '#fef9c3'; textColor = '#a16207' }
                            else if (percentage > 0) { bgColor = '#ffedd5'; textColor = '#c2410c' }
                            else { bgColor = '#fee2e2'; textColor = '#b91c1c' }
                        }
                        
                        return (
                            <div className="flex flex-col items-center w-full">
                                <span className="fc-daygrid-day-number">{arg.dayNumberText}</span>
                                {!isPast && totalRooms > 0 && (
                                    <span 
                                        className="availability-badge"
                                        style={{ backgroundColor: bgColor, color: textColor }}
                                    >
                                        {available}
                                    </span>
                                )}
                            </div>
                        )
                    }}
                />
            </div>
        </div>
    );
};

export default DashboardCalendar;
