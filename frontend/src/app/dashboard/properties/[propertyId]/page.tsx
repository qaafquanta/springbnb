'use client'
import { useEffect, useState } from "react";
import React from "react";
import  Image  from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHotel, FaLocationDot ,FaBook, FaPlus,FaX} from "react-icons/fa6";

type Params = {
  propertyId: string;
};

export default function RoomManagement({ params }: { params : Params}){
    const {propertyId} = React.use(params)
    console.log(propertyId)
    const [property,setProperty] = useState(null)
    useEffect(()=>{
        const fetchProperties = async(id:string) => {
            const response = await fetch(`http://localhost:8000/property/${id}`,{
                method:'GET',
                credentials: 'include'
            })
            const result = await response.json()
            console.log(result)
            setProperty(result.property)
        }
        fetchProperties(propertyId)
    },[])

    const [formData,setFormData]= useState({
        name:"",
        description:"",
        basePrice:"",
        capacity:"",
        categoryId:"",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = new FormData();
        console.log(formData)
        form.append("name",formData.name)
        form.append("description",formData.description)
        form.append("basePrice",formData.basePrice)
        form.append("capacity",formData.capacity)
        form.append("categoryId",formData.categoryId)
        if(imageFile){
            form.append("imageUrl",imageFile)
        }
        try{
            const response = await fetch(`http://localhost:8000/room-type/create/${propertyId}`, {
                method: "POST",
                body: form,
                credentials: "include"
            });
            const data = await response.json()
            console.log(data)
            if (!response.ok) {
                throw new Error('Failed to create room type cause response');
            }
            alert("Room type created successfully")
            setFormData({name:"",description:"",basePrice:"",capacity:"",categoryId:""})
            setPreview(null)
            setImageFile(null)
            console.log(data)
        }catch(err){
            console.error(err)
            alert("Failed to create room type")
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const [imageFile, setImageFile] = useState<File|null>(null);
    const [preview, setPreview] = useState<string|null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file){
        setImageFile(file)
        setPreview(URL.createObjectURL(file))
        }
        // const filesArray = Array.from(e.target.files);

        // setImageFiles(filesArray);

        // const previewUrls = filesArray.map((file) => URL.createObjectURL(file));
        // setPreviews(previewUrls);
    };
    const [isCreateRoomTypeModalOpen,setIsCreateRoomTypeModalOpen] = useState(false)

    const pathname = usePathname();

  const segments = pathname
    .split("/")
    .filter(Boolean);
    return(
        <div className="mt-20 pt-5 px-5 bg-neutral-100 w-full min-h-screen">
            <div className="flex items-center gap-2 text-sm text-gray-500">
      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;

        // bikin label lebih rapi
        const label = segment
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());

        return (
          <div key={href} className="flex items-center gap-2">
            {!isLast ? (
              <Link href={href} className="hover:underline">
                {label}
              </Link>
            ) : (
              <span className="font-medium text-gray-900">
                {label}
              </span>
            )}

            {!isLast && <span>/</span>}
          </div>
        );
      })}
            </div>
            {
                isCreateRoomTypeModalOpen &&
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    {/* Card */}             
                    <div className="w-[360px] max-w-[90vw] h-[640px] max-h-[90vh] bg-white rounded-2xl shadow-xl relative flex flex-col px-4 py-4 gap-4">
                        <div className="flex justify-end border-b-[1px] border-neutral-300">
                            <button onClick={()=>setIsCreateRoomTypeModalOpen(false)} className="pb-2 pr-2"><FaX size={15} className="text-neutral-800 hover:text-rose-500 hover:scale-105 transition"/></button>
                        </div>
                        <h1 className="text-xl font-semibold mb-4">Create New Room Type</h1>
                        <form className="flex flex-col gap-4 items-center w-full justify-center" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Room Type Name" required  onChange={(e)=>handleChange(e)} name="name" value={formData.name} className='w-full p-2 border-[1px] border-neutral-300 rounded-lg active:border-rose-600 focus:border-rose-600 transition'></input>
                    <input type="textbox" placeholder="Room Type Description" required  onChange={(e)=>handleChange(e)} name="description" value={formData.description} className='w-full p-2 border-[1px] border-neutral-300 rounded-lg active:border-rose-600 focus:border-rose-600 transition'></input>
                    <input type="number" placeholder="Base Price" required  onChange={(e)=>handleChange(e)} name="basePrice" value={formData.basePrice} className='w-full p-2 border-[1px] border-neutral-300 rounded-lg active:border-rose-600 focus:border-rose-600 transition'></input>
                    <input type="number" placeholder="Capacity" required  onChange={(e)=>handleChange(e)} name="capacity" value={formData.capacity} className='w-full p-2 border-[1px] border-neutral-300 rounded-lg active:border-rose-600 focus:border-rose-600 transition'></input>
                    
                        <img src={preview} className="w-32 h-32 object-cover" />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />


                    <button type="submit" className="bg-rose-600 text-white px-4 py-2 rounded-lg font-semibold tracking-wide w-full">Create Room Type</button>

                </form>
                    </div>
                </div>
            }
            {property?
            <>
            <div className="h-25 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-black ">{property.name}</h1>
                <button onClick={()=>setIsCreateRoomTypeModalOpen(true)} className="group rounded-full justify-center items-center flex bg-rose-500 px-8 py-3 gap-3 text-white hover:cursor-pointer shadow-sm hover:shadow-md transition">
                    <FaPlus size={20} className="group-hover:rotate-90 group-hover:scale-105 transition duration-300"/>
                    <h1 className="font-semibold">Create New Room Type</h1>
                </button>
            </div>            
            <div className="gap-5 flex flex-col">
                {
                    property.roomTypes.length > 0 ? 
                        <div className="flex flex-col gap-5">
                            {
                                property.roomTypes.map((roomType)=>{
                                    return(
                                        <div key={roomType.id} className=" gap-2 grid grid-cols-5 border rounded-xl bg-white shadow p-5 gap-5 items-center">
                                            <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                                                <Image
                                                    fill
                                                    src={roomType.images[0]}
                                                    alt={roomType.name}
                                                    className="object-cover h-full w-full hover:scale-110 transition"
                                                    />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <h1 className="text-xl font-semibold">{roomType.name}</h1>
                                                <p className="text-neutral-700 font-light">{roomType.description}</p>
                                            </div>
                                            <div className="flex flex-col gap-2 items-center">
                                                <p className="text-neutral-700 font-semibold">Rp{Number(roomType.basePrice).toLocaleString("en-US")}</p>
                                                <p className="text-neutral-700 font-semibold">Capacity {roomType.capacity} Guests</p>
                                            </div>
                                            <div className="flex flex-col gap-2 items-center">
                                                <p className="text-neutral-700 font-semibold">Total Rooms: {roomType.rooms.length}</p>
                                                <button className="text-sm bg-rose-500 text-white px-4 py-2 rounded-lg font-semibold tracking-wide w-full hover:cursor-pointer transition">Add Room</button>
                                            </div>
                                            <div className="flex flex-col gap-2 items-center">
                                                <button className="text-sm bg-rose-500 text-white px-4 py-2 rounded-lg font-semibold tracking-wide w-full hover:cursor-pointer transition">Edit</button>
                                                <button className="text-sm bg-rose-500 text-white px-4 py-2 rounded-lg font-semibold tracking-wide w-full hover:cursor-pointer transition">Delete</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    : 
                    <p>Room Unavailable</p>
                }
            </div>
            </>
            : <div>Invalid PropertyId</div>
            }
            
        </div>
    )
}