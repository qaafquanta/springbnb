'use client'
import { useEffect, useState } from "react";
import  Image  from "next/image";
import Link from "next/link";
import { FaHotel, FaLocationDot ,FaBook, FaPlus} from "react-icons/fa6";
export default function PropertiesPage(){
    const [properties,setProperties] = useState([])
    useEffect(()=>{
        const fetchProperties = async() => {
            const response = await fetch('http://localhost:8000/property/dashboard-properties',{
                method:'GET',
                credentials: 'include'
            })
            const data = await response.json()
            console.log(data)
            setProperties(data.result)
        }
        fetchProperties()
    },[])
    return(
        <div className="mt-20 pt-5 px-5 bg-neutral-100 w-full min-h-screen">
            <div className="h-25 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-black ">My Properties</h1>
                <Link className="group rounded-full justify-center items-center flex bg-rose-500 px-8 py-3 gap-3 text-white hover:cursor-pointer shadow-sm hover:shadow-md transition"
                href="/dashboard/create-property">
                    <FaPlus size={20} className="group-hover:rotate-90 group-hover:scale-105 transition duration-300"/>
                    <h1 className="font-semibold">Add New Property</h1>
                </Link>
            </div>            
            <div className="gap-5 flex flex-col">
            {
                properties?.map((property:any) => 
                <div key={property.id} className="grid grid-cols-5 border rounded-xl bg-white shadow p-5 gap-5">
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                        <Image
                        fill
                        src={property.images[0]}
                        alt={property.name}
                        className="object-cover h-full w-full hover:scale-110 transition"
                        >

                        </Image>
                        
                    </div>
                    <div className="flex flex-col gap-2 justify-center">
                        <h2 className="font-semibold text-2xl mb-5">
                            {property.name}
                        </h2>
                        <div className="flex gap-2 items-center">
                            <FaLocationDot size={20} className="text-rose-500" />
                            <h2 className="">
                                {property.city[0].toUpperCase()+ property.city.slice(1).toLowerCase()}
                            </h2>                  
                        </div>
                        <div className="flex gap-2 items-center">
                            <FaHotel size={20} className="text-rose-500" />
                            <h2 className="">
                                {property.category.name[0].toUpperCase() + property.category.name.slice(1).toLowerCase()}
                            </h2>                  
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 justify-center">
                        <p>
                            {property.description}
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 justify-center">
                        <span>Total Room Types: {property ? property.roomTypes.length : 0}</span>
                        <span>Total Rooms: </span>
                        <Link className="group font-semibold gap-2 rounded-full items-center justify-center flex bg-rose-500 text-white transition cursor-pointer w-fit px-4 py-2"
                        href={`/dashboard/properties/${property.id}`}>
                            <FaBook size={20} className="group-hover:scale-110 transition duration-300"/>
                            <span>Manage Rooms</span>
                        </Link>
                    </div>
                    <div className="flex flex-col gap-2 justify-center">
                        <p>
                            
                        </p>
                    </div>
                </div>)
            }
            </div>
        </div>
    )
}