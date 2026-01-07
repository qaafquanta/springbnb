'use client'
import React from 'react'

interface PlacePickerProps{
    place?:string
    setPlace: (place:string) => void
}
const PlacePicker:React.FC<PlacePickerProps> = ({
    place,
    setPlace
}) => {
    return (
        <div className="max-w-3xl px-4 py-2 flex-col border bg-white border-gray-300 rounded-xl shadow-lg overflow-hidden">
            <input
            type="text"
            onChange={(e)=>setPlace(e.target.value)}
            placeholder="Search destinations"
            value={place}
            className="w-full border-none outline-none"
            >
            </input>
        </div>
    )
}

export default PlacePicker;