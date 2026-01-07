'use client'
import { useState ,useEffect} from "react"
import { FaPlus,FaX } from "react-icons/fa6"
import { DatePicker } from "antd"
const { RangePicker } = DatePicker;
export default function PeakSeasonRate() {
    const [isModalOpen,setIsModalOpen] = useState(false)
    const [formData,setFormData]= useState({
        reason:"",
        adjustmentType:"",
        adjustmentValue:"",
        startDate:"",
        endDate:"",
        roomTypeIds:[] as string[]
    })
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formData)
        const response = await fetch(`http://localhost:8000/peak-season-rate/create`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'credentials':'include'
            },
            body:JSON.stringify(formData)
        })
        const result = await response.json()
        console.log(result)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleRoomTypeChange = (roomTypeId: string, checked: boolean) => {
        setFormData((prev) => {
            const ids = prev.roomTypeIds

            if (checked) {
            // tambah
            return { ...prev, roomTypeIds: [...ids, roomTypeId] }
            } else {
            // hapus
            return { ...prev, roomTypeIds: ids.filter((id) => id !== roomTypeId) }
            }
        })
    }

    const [properties,setProperties] = useState(null)
    const [peakSeasonRates,setPeakSeasonRates] = useState(null)
    useEffect(()=>{
        const fetchRoomTypes = async() => {
            const response = await fetch(`http://localhost:8000/room-type`,{
                method:'GET',
                credentials: 'include'
            })
            const properties = await response.json()
            console.log(properties)
            setProperties(properties)
        }
        const fetchPeakSeasonRates = async() => {
            const response = await fetch(`http://localhost:8000/peak-season-rate`,{
                method:'GET',
                credentials: 'include'
            })
            const peakSeasonRates = await response.json()
            console.log(peakSeasonRates)
            setPeakSeasonRates(peakSeasonRates)
        }
        fetchRoomTypes()
        fetchPeakSeasonRates()
    },[])
    return (
        <div className="mt-20 pt-5 px-5 bg-neutral-100 w-full min-h-screen">
            <div className="h-25 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-black ">Peak Season Rate</h1>
                <button onClick={()=>setIsModalOpen(true)} className="group rounded-full justify-center items-center flex bg-rose-500 px-8 py-3 gap-3 text-white hover:cursor-pointer shadow-sm hover:shadow-md transition">
                    <FaPlus size={20} className="group-hover:rotate-90 group-hover:scale-105 transition duration-300"/>
                    <h1 className="font-semibold">Create New Peak Season Rate</h1>
                </button>
            </div>
            {
                peakSeasonRates?.length > 0 &&
                <div className="flex flex-col gap-4 bg-white py-2 px-4 rounded-lg">
                    {
                        peakSeasonRates?.map((peakSeasonRate:any)=>{
                            return(
                                <div key={peakSeasonRate.id} className="grid grid-cols-7">
                                    <h1>{peakSeasonRate.roomType.property.name}</h1>
                                    <h1>{peakSeasonRate.roomType.name}</h1>
                                    <h1>{peakSeasonRate.reason}</h1>
                                    <h1>{peakSeasonRate.adjustmentType}</h1>
                                    <h1>{peakSeasonRate.adjustmentValue}</h1>
                                    <h1>{new Date(peakSeasonRate.startDate).toLocaleDateString('us-US', { day: '2-digit', month: 'long', year: 'numeric' })}</h1>
                                    <h1>{new Date(peakSeasonRate.endDate).toLocaleDateString('us-US', { day: '2-digit', month: 'long', year: 'numeric' })}</h1>
                                </div>
                            )
                        })
                    }
                </div>
            }
            {
                isModalOpen &&
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    {/* Card */}             
                    <div className="w-[360px] max-w-[90vw] h-[640px] max-h-[90vh] bg-white rounded-2xl shadow-xl relative flex flex-col px-4 py-4 gap-4">
                        <div className="flex justify-end border-b-[1px] border-neutral-300">
                            <button onClick={()=>setIsModalOpen(false)} className="pb-2 pr-2"><FaX size={15} className="text-neutral-800 hover:text-rose-500 hover:scale-105 transition"/></button>
                        </div>
                        <h1 className="text-xl font-semibold mb-4">Create New Peak Season Rate</h1>
                        <form className="flex flex-col gap-4 items-center w-full justify-center"
                        onSubmit={handleSubmit}
                        >
                            <div className="flex flex-col w-full border rounded-lg py-2">
                                {
                                    properties?.map((property:any)=>{
                                        return(
                                            <div key={property.name} className="flex flex-col items-center border-b-[1px] border-neutral-300 w-full">
                                                <div className="flex items-start">
                                                    <h1 className="font-semibold">{property.name}</h1>
                                                </div>
                                                <div className="flex flex-col">
                                                    {
                                                        property.roomTypes?.map((roomType:any)=>{
                                                            return(
                                                                <label className="flex items-center justify-between gap-2">
                                                                    <h1>{roomType.name}</h1>
                                                                    <input key={roomType.id} type="checkbox" value={roomType.id} onChange={(e)=>handleRoomTypeChange(roomType.id,e.target.checked)}></input>
                                                                </label>
                                                            )
                                                        })
                                                    }
                                                </div>
                                               
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <input type="text" placeholder="Reason" required  onChange={(e)=>handleChange(e)} name="reason" value={formData.reason} className='w-full p-2 border-[1px] border-neutral-300 rounded-lg active:border-rose-600 focus:border-rose-600 transition'></input>
                            <select
                                id="adjustment-type"
                                value={formData.adjustmentType}
                                onChange={(e)=>handleChange(e)}
                                name="adjustmentType"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                            >
                               <option value="PERCENTAGE">Percentage</option>
                               <option value="NOMINAL">Nominal</option>
                            </select>
                            <input type="number" placeholder="Adjustment Value" required  onChange={(e)=>handleChange(e)} name="adjustmentValue" value={formData.adjustmentValue} className='w-full p-2 border-[1px] border-neutral-300 rounded-lg active:border-rose-600 focus:border-rose-600 transition'></input>
                            <RangePicker
                                format="YYYY-MM-DD"
                                onChange={(dates,strings)=>{
                                    setFormData((prev:any)=>{
                                        return{
                                            ...prev,
                                            startDate:strings[0],
                                            endDate:strings[1]
                                        }
                                    })
                                }}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                            />
                            <button type="submit" className="group rounded-full justify-center items-center flex bg-rose-500 px-8 py-3 gap-3 text-white hover:cursor-pointer shadow-sm hover:shadow-md transition">
                                <FaPlus size={20} className="group-hover:rotate-90 group-hover:scale-105 transition duration-300"/>
                                <h1 className="font-semibold">Create New Peak Season Rate</h1>
                            </button>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}