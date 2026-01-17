'use client';

import React, { useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

type CalendarDay = {
    date: string;
    price: number;
    isPeakSeason: boolean;
    peakSeasonReason: string | null;
    isAvailable: boolean;
}

interface RoomTypeCalendarProps {
    calendarData: CalendarDay[];
    loading: boolean;
    onMonthChange: (month: string) => void;
}

const RoomTypeCalendar: React.FC<RoomTypeCalendarProps> = ({ calendarData, loading, onMonthChange }) => {
    const calendarMap = useMemo(() => {
        const map: Record<string, CalendarDay> = {}
        calendarData.forEach(item => {
            map[item.date] = item
        })
        return map
    }, [calendarData])

    const formatPrice = (price: number, short = false) => {
        if (short) {
            if (price >= 1000000) {
                return `${(price / 1000000).toFixed(1)}M`
            } else if (price >= 1000) {
                return `${Math.round(price / 1000)}K`
            }
            return price.toString()
        }
        return `Rp${price.toLocaleString('id-ID')}`
    }

    const handleDatesSet = (dateInfo: { start: Date; end: Date }) => {
        const middleDate = new Date((dateInfo.start.getTime() + dateInfo.end.getTime()) / 2)
        const month = `${middleDate.getFullYear()}-${String(middleDate.getMonth() + 1).padStart(2, '0')}`
        onMonthChange(month)
    }

    return (
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="p-4">
                <style jsx global>{`
                    .room-type-calendar .fc {
                        font-family: inherit;
                        font-size: 0.85rem;
                    }
                    .room-type-calendar .fc .fc-toolbar {
                        margin-bottom: 0.75rem !important;
                    }
                    .room-type-calendar .fc .fc-toolbar-title {
                        font-size: 1rem;
                        font-weight: 600;
                    }
                    .room-type-calendar .fc .fc-button {
                        padding: 0.25rem 0.5rem;
                        font-size: 0.75rem;
                    }
                    .room-type-calendar .fc .fc-button-primary {
                        background-color: #f43f5e;
                        border-color: #f43f5e;
                    }
                    .room-type-calendar .fc .fc-button-primary:hover {
                        background-color: #e11d48;
                        border-color: #e11d48;
                    }
                    .room-type-calendar .fc .fc-button-primary:disabled {
                        background-color: #fda4af;
                        border-color: #fda4af;
                    }
                    .room-type-calendar .fc table {
                        border: none !important;
                    }
                    .room-type-calendar .fc th, 
                    .room-type-calendar .fc td {
                        border: none !important;
                    }
                    .room-type-calendar .fc .fc-scrollgrid {
                        border: none !important;
                    }
                    .room-type-calendar .fc .fc-scrollgrid-section > td {
                        border: none !important;
                    }
                    .room-type-calendar .fc .fc-col-header-cell {
                        padding: 0.5rem 0;
                        font-weight: 500;
                        font-size: 0.7rem;
                        color: #9ca3af;
                        text-transform: uppercase;
                    }
                    .room-type-calendar .fc .fc-daygrid-day {
                        cursor: default;
                    }
                    .room-type-calendar .fc .fc-daygrid-day-frame {
                        min-height: 70px !important;
                    }
                    .room-type-calendar .fc .fc-daygrid-day-number {
                        font-weight: 500;
                        padding: 2px 6px;
                        font-size: 0.8rem;
                    }
                    .room-type-calendar .fc .fc-daygrid-day-top {
                        flex-direction: row;
                        justify-content: center;
                    }
                    .room-type-calendar .fc .fc-daygrid-day-events {
                        display: none;
                    }
                    .room-type-calendar .fc-day-today {
                        background-color: transparent !important;
                    }
                    .room-type-calendar .fc-day-today .fc-daygrid-day-number {
                        background-color: #f43f5e;
                        color: white;
                        border-radius: 50%;
                        width: 24px;
                        height: 24px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .room-type-calendar .price-badge {
                        font-size: 9px;
                        font-weight: 700;
                        padding: 1px 5px;
                        border-radius: 9999px;
                        text-align: center;
                        margin: 1px auto;
                    }
                    @media (max-width: 768px) {
                        .room-type-calendar .fc .fc-daygrid-day-frame {
                            min-height: 55px !important;
                        }
                        .room-type-calendar .price-badge {
                            font-size: 8px;
                            padding: 1px 3px;
                        }
                    }
                `}</style>
                <div className={`room-type-calendar ${loading ? 'opacity-50' : ''}`}>
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
                        datesSet={handleDatesSet}
                        dayCellContent={(arg) => {
                            const dateStr = arg.date.toISOString().split('T')[0]
                            const dayData = calendarMap[dateStr]
                            
                            let priceBg = '#d1fae5'
                            let priceColor = '#047857'
                            
                            if (dayData) {
                                if (!dayData.isAvailable) {
                                    priceBg = '#e5e7eb'
                                    priceColor = '#9ca3af'
                                } else if (dayData.isPeakSeason) {
                                    priceBg = '#fee2e2'
                                    priceColor = '#b91c1c'
                                } else {
                                    priceBg = '#d1fae5'
                                    priceColor = '#047857'
                                }
                            }
                            
                            return (
                                <div 
                                    className="flex flex-col items-center w-full"
                                    title={dayData?.isPeakSeason && dayData?.peakSeasonReason ? `Peak Season: ${dayData.peakSeasonReason}` : undefined}
                                >
                                    <span className="fc-daygrid-day-number">
                                        {arg.dayNumberText}
                                    </span>
                                    {dayData && (
                                        <span 
                                            className="price-badge"
                                            style={{ backgroundColor: priceBg, color: priceColor }}
                                        >
                                            {formatPrice(dayData.price, true)}
                                        </span>
                                    )}
                                </div>
                            )
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default RoomTypeCalendar;
