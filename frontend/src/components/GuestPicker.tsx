'use client'
import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6'

interface GuestPickerProps {
    adults: number
    setAdults: (value: number) => void
    children: number
    setChildren: (value: number) => void
}

const GuestPicker: React.FC<GuestPickerProps> = ({
    adults,
    setAdults,
    children,
    setChildren,
}) => {
    const handleIncrement = (type: 'adults' | 'children') => {
        if (type === 'adults') {
            setAdults(adults + 1)
            console.log(adults)
        } else {
            setChildren(children + 1)
        }
    }

    const handleDecrement = (type: 'adults' | 'children') => {
        if (type === 'adults' && adults > 0) {
            setAdults(adults - 1)
        } else if (type === 'children' && children > 0) {
            setChildren(children - 1)
        }
    }

    return (
        <div className="w-96 bg-white border border-gray-200 rounded-2xl shadow-xl p-6">
            {/* Adults Row */}
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
                <div className="flex flex-col">
                    <span className="text-base font-medium text-gray-900">Adults</span>
                    <span className="text-sm text-gray-500">Ages 13 or above</span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => handleDecrement('adults')}
                        disabled={adults === 0}
                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200
                            ${adults === 0 
                                ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                                : 'border-gray-400 text-gray-600 hover:border-gray-900 hover:text-gray-900'
                            }`}
                    >
                        <FaMinus size={12} />
                    </button>
                    <span className="w-8 text-center text-base font-medium text-gray-900">{adults}</span>
                    <button
                        onClick={() => handleIncrement('adults')}
                        className="w-8 h-8 rounded-full border border-gray-400 text-gray-600 flex items-center justify-center hover:border-gray-900 hover:text-gray-900 transition-all duration-200"
                    >
                        <FaPlus size={12} />
                    </button>
                </div>
            </div>

            {/* Children Row */}
            <div className="flex items-center justify-between py-4">
                <div className="flex flex-col">
                    <span className="text-base font-medium text-gray-900">Children</span>
                    <span className="text-sm text-gray-500">Ages 2-12</span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => handleDecrement('children')}
                        disabled={children === 0}
                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200
                            ${children === 0 
                                ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                                : 'border-gray-400 text-gray-600 hover:border-gray-900 hover:text-gray-900'
                            }`}
                    >
                        <FaMinus size={12} />
                    </button>
                    <span className="w-8 text-center text-base font-medium text-gray-900">{children}</span>
                    <button
                        onClick={() => handleIncrement('children')}
                        className="w-8 h-8 rounded-full border border-gray-400 text-gray-600 flex items-center justify-center hover:border-gray-900 hover:text-gray-900 transition-all duration-200"
                    >
                        <FaPlus size={12} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GuestPicker