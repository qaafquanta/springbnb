'use client'
import { useEffect, useState } from "react";
import React from "react";
import  Image  from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHotel, FaLocationDot ,FaBook, FaPlus,FaX, FaPencil, FaTrash} from "react-icons/fa6";

type Params = Promise<{
  propertyId: string;
}>;

type Room = {
    id: string;
    roomNumber: number;
    roomTypeId: string;
}

type RoomType = {
    id: string;
    name: string;
    description: string;
    basePrice: number;
    capacity: number;
    images: string[];
    rooms: Room[];
}

type Property = {
    id: string;
    name: string;
    description: string;
    address: string;
    categoryId: string;
    category: {
        id: string;
        name: string;
    };
    roomTypes: RoomType[];
}

export default function RoomManagement({ params }: { params : Params}){
    const {propertyId} = React.use(params)
    console.log(propertyId)
    const [property,setProperty] = useState<Property | null>(null)
    
    const fetchProperty = async(id:string) => {
        const response = await fetch(`/api/backend/property/${id}`,{
            method:'GET'
        })
        const result = await response.json()
        console.log(result)
        setProperty(result.property)
    }
    
    useEffect(()=>{
        fetchProperty(propertyId)
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
            const response = await fetch(`/api/backend/room-type/create/${propertyId}`, {
                method: "POST",
                body: form
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
            fetchProperty(propertyId)
            setIsCreateRoomTypeModalOpen(false)
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
    };
    const [isCreateRoomTypeModalOpen,setIsCreateRoomTypeModalOpen] = useState(false)

    const [isManageRoomModalOpen, setIsManageRoomModalOpen] = useState(false)
    const [selectedRoomType, setSelectedRoomType] = useState<RoomType|null>(null)
    const [rooms, setRooms] = useState<Room[]>([])
    const [newRoomNumber, setNewRoomNumber] = useState("")
    const [isEditingRoom, setIsEditingRoom] = useState(false)
    const [editingRoom, setEditingRoom] = useState<Room|null>(null)
    const [editRoomNumber, setEditRoomNumber] = useState("")

    const openManageRoomModal = async (roomType: RoomType) => {
        setSelectedRoomType(roomType)
        setIsManageRoomModalOpen(true)
        await fetchRooms(roomType.id)
    }

    const fetchRooms = async (roomTypeId: string) => {
        try{
            const response = await fetch(`/api/backend/room/${roomTypeId}`,{
                method:'GET'
            })
            const result = await response.json()
            setRooms(result.rooms || [])
        }catch(err){
            console.error(err)
        }
    }

    const handleCreateRoom = async (e: React.FormEvent) => {
        e.preventDefault()
        if(!selectedRoomType) return
        try{
            const response = await fetch(`/api/backend/room/create/${selectedRoomType.id}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({ roomNumber: newRoomNumber })
            })
            const result = await response.json()
            if(!response.ok){
                throw new Error(result.error || 'Failed to create room')
            }
            alert("Room created successfully")
            setNewRoomNumber("")
            await fetchRooms(selectedRoomType.id)
            await fetchProperty(propertyId)
        }catch(err){
            console.error(err)
            alert("Failed to create room")
        }
    }

    const handleEditRoom = (room: Room) => {
        setIsEditingRoom(true)
        setEditingRoom(room)
        setEditRoomNumber(room.roomNumber.toString())
    }

    const handleUpdateRoom = async (e: React.FormEvent) => {
        e.preventDefault()
        if(!editingRoom) return
        try{
            const response = await fetch(`/api/backend/room/update/${editingRoom.id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({ roomNumber: editRoomNumber })
            })
            const result = await response.json()
            if(!response.ok){
                throw new Error(result.error || 'Failed to update room')
            }
            alert("Room updated successfully")
            setIsEditingRoom(false)
            setEditingRoom(null)
            setEditRoomNumber("")
            if(selectedRoomType) await fetchRooms(selectedRoomType.id)
            await fetchProperty(propertyId)
        }catch(err){
            console.error(err)
            alert("Failed to update room")
        }
    }

    const handleDeleteRoom = async (roomId: string) => {
        if(!confirm("Are you sure you want to delete this room?")) return
        try{
            const response = await fetch(`/api/backend/room/delete/${roomId}`,{
                method:'DELETE'
            })
            const result = await response.json()
            if(!response.ok){
                throw new Error(result.error || 'Failed to delete room')
            }
            alert("Room deleted successfully")
            if(selectedRoomType) await fetchRooms(selectedRoomType.id)
            await fetchProperty(propertyId)
        }catch(err){
            console.error(err)
            alert("Failed to delete room")
        }
    }

    const closeManageRoomModal = () => {
        setIsManageRoomModalOpen(false)
        setSelectedRoomType(null)
        setRooms([])
        setNewRoomNumber("")
        setIsEditingRoom(false)
        setEditingRoom(null)
        setEditRoomNumber("")
    }

    const [isEditRoomTypeModalOpen, setIsEditRoomTypeModalOpen] = useState(false)
    const [editingRoomType, setEditingRoomType] = useState<RoomType|null>(null)
    const [deleteRoomTypeModal, setDeleteRoomTypeModal] = useState<{isOpen: boolean, roomType: RoomType | null}>({
        isOpen: false,
        roomType: null
    })
    const [deleteConfirmationText, setDeleteConfirmationText] = useState("")

    const handleEditRoomTypeClick = (roomType: RoomType) => {
        setEditingRoomType(roomType)
        setFormData({
            name: roomType.name,
            description: roomType.description,
            basePrice: roomType.basePrice.toString(),
            capacity: roomType.capacity.toString(),
            categoryId: property?.categoryId || "" 
        })
        if (roomType.images && roomType.images.length > 0) {
            setPreview(roomType.images[0])
        }
        setIsEditRoomTypeModalOpen(true)
    }

    const handleUpdateRoomType = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!editingRoomType) return

        const form = new FormData()
        form.append("name", formData.name)
        form.append("description", formData.description)
        form.append("basePrice", formData.basePrice)
        form.append("capacity", formData.capacity)
        if (imageFile) {
            form.append("imageUrl", imageFile)
        }

        try {
            const response = await fetch(`/api/backend/room-type/update/${editingRoomType.id}`, {
                method: "PUT",
                body: form
            })
            
            if (!response.ok) {
                throw new Error('Failed to update room type')
            }

            alert("Room type updated successfully")
            setFormData({name:"",description:"",basePrice:"",capacity:"",categoryId:""})
            setPreview(null)
            setImageFile(null)
            setEditingRoomType(null)
            setIsEditRoomTypeModalOpen(false)
            fetchProperty(propertyId)
        } catch (err) {
            console.error(err)
            alert("Failed to update room type")
        }
    }

    const handleDeleteRoomTypeClick = (roomType: RoomType) => {
        setDeleteRoomTypeModal({ isOpen: true, roomType })
        setDeleteConfirmationText("")
    }

    const handleDeleteRoomTypeConfirm = async () => {
        if (!deleteRoomTypeModal.roomType) return
        
        if (deleteConfirmationText.toLowerCase() !== "delete") return

        try {
            const response = await fetch(`/api/backend/room-type/delete/${deleteRoomTypeModal.roomType.id}`, {
                method: "DELETE"
            })

            if (!response.ok) {
                throw new Error('Failed to delete room type')
            }

            alert("Room type deleted successfully")
            setDeleteRoomTypeModal({ isOpen: false, roomType: null })
            setDeleteConfirmationText("")
            fetchProperty(propertyId)
        } catch (err) {
            console.error(err)
            alert("Failed to delete room type")
        }
    }


    const pathname = usePathname();

    const segments = pathname
        .split("/")
        .filter(Boolean);

    return(
        <div className="pt-4 md:pt-5 px-3 md:px-5 bg-neutral-100 w-full min-h-screen">
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 overflow-x-auto pb-2 whitespace-nowrap">
                {segments.map((segment, index) => {
                    const href = "/" + segments.slice(0, index + 1).join("/");
                    const isLast = index === segments.length - 1;

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

            {isCreateRoomTypeModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-[360px] md:w-[360px] max-h-[90vh] bg-white rounded-2xl shadow-xl relative flex flex-col px-4 py-4 gap-4 overflow-y-auto">
                        <div className="flex justify-between items-center border-b-[1px] border-neutral-300 pb-2">
                            <h1 className="text-lg md:text-xl font-semibold">Create New Room Type</h1>
                            <button onClick={()=>setIsCreateRoomTypeModalOpen(false)} className="p-2">
                                <FaX size={15} className="text-neutral-800 hover:text-rose-500 hover:scale-105 transition"/>
                            </button>
                        </div>
                        
                        <form className="flex flex-col gap-4 items-center w-full justify-center" onSubmit={handleSubmit}>
                            <input 
                                type="text" 
                                placeholder="Room Type Name" 
                                required  
                                onChange={(e)=>handleChange(e)} 
                                name="name" 
                                value={formData.name} 
                                className='w-full p-3 text-sm md:text-base border-[1px] border-neutral-300 rounded-lg focus:border-rose-600 focus:outline-none transition'
                            />
                            <input 
                                type="text" 
                                placeholder="Room Type Description" 
                                required  
                                onChange={(e)=>handleChange(e)} 
                                name="description" 
                                value={formData.description} 
                                className='w-full p-3 text-sm md:text-base border-[1px] border-neutral-300 rounded-lg focus:border-rose-600 focus:outline-none transition'
                            />
                            <input 
                                type="number" 
                                placeholder="Base Price" 
                                required  
                                onChange={(e)=>handleChange(e)} 
                                name="basePrice" 
                                value={formData.basePrice} 
                                className='w-full p-3 text-sm md:text-base border-[1px] border-neutral-300 rounded-lg focus:border-rose-600 focus:outline-none transition'
                            />
                            <input 
                                type="number" 
                                placeholder="Capacity" 
                                required  
                                onChange={(e)=>handleChange(e)} 
                                name="capacity" 
                                value={formData.capacity} 
                                className='w-full p-3 text-sm md:text-base border-[1px] border-neutral-300 rounded-lg focus:border-rose-600 focus:outline-none transition'
                            />
                            
                            {preview && (
                                <img src={preview} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg" />
                            )}
                            
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full text-sm"
                            />

                            <button 
                                type="submit" 
                                className="bg-rose-600 text-white px-4 py-3 rounded-lg font-semibold tracking-wide w-full text-sm md:text-base hover:bg-rose-700 transition"
                            >
                                Create Room Type
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {isEditRoomTypeModalOpen && editingRoomType && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-[360px] md:w-[360px] max-h-[90vh] bg-white rounded-2xl shadow-xl relative flex flex-col px-4 py-4 gap-4 overflow-y-auto">
                        <div className="flex justify-between items-center border-b-[1px] border-neutral-300 pb-2">
                            <h1 className="text-lg md:text-xl font-semibold">Edit Room Type</h1>
                            <button onClick={()=>{setIsEditRoomTypeModalOpen(false); setEditingRoomType(null); setFormData({name:"",description:"",basePrice:"",capacity:"",categoryId:""}); setPreview(null); setImageFile(null)}} className="p-2">
                                <FaX size={15} className="text-neutral-800 hover:text-rose-500 hover:scale-105 transition"/>
                            </button>
                        </div>
                        
                        <form className="flex flex-col gap-4 items-center w-full justify-center" onSubmit={handleUpdateRoomType}>
                            <input 
                                type="text" 
                                placeholder="Room Type Name" 
                                required  
                                onChange={(e)=>handleChange(e)} 
                                name="name" 
                                value={formData.name} 
                                className='w-full p-3 text-sm md:text-base border-[1px] border-neutral-300 rounded-lg focus:border-rose-600 focus:outline-none transition'
                            />
                            <input 
                                type="text" 
                                placeholder="Room Type Description" 
                                required  
                                onChange={(e)=>handleChange(e)} 
                                name="description" 
                                value={formData.description} 
                                className='w-full p-3 text-sm md:text-base border-[1px] border-neutral-300 rounded-lg focus:border-rose-600 focus:outline-none transition'
                            />
                            <input 
                                type="number" 
                                placeholder="Base Price" 
                                required  
                                onChange={(e)=>handleChange(e)} 
                                name="basePrice" 
                                value={formData.basePrice} 
                                className='w-full p-3 text-sm md:text-base border-[1px] border-neutral-300 rounded-lg focus:border-rose-600 focus:outline-none transition'
                            />
                            <input 
                                type="number" 
                                placeholder="Capacity" 
                                required  
                                onChange={(e)=>handleChange(e)} 
                                name="capacity" 
                                value={formData.capacity} 
                                className='w-full p-3 text-sm md:text-base border-[1px] border-neutral-300 rounded-lg focus:border-rose-600 focus:outline-none transition'
                            />
                            
                            {preview && (
                                <img src={preview} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg" />
                            )}
                            
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full text-sm"
                            />

                            <button 
                                type="submit" 
                                className="bg-rose-600 text-white px-4 py-3 rounded-lg font-semibold tracking-wide w-full text-sm md:text-base hover:bg-rose-700 transition"
                            >
                                Update Room Type
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {deleteRoomTypeModal.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-[360px] bg-white rounded-2xl shadow-xl relative flex flex-col px-4 py-4 gap-4">
                        <div className="flex justify-between items-center border-b-[1px] border-neutral-300 pb-2">
                            <h1 className="text-lg font-semibold text-red-600">Delete Room Type</h1>
                            <button onClick={()=>setDeleteRoomTypeModal({isOpen: false, roomType: null})} className="p-2">
                                <FaX size={15} className="text-neutral-800 hover:text-red-500 hover:scale-105 transition"/>
                            </button>
                        </div>
                        
                        <div className="flex flex-col gap-3">
                            <p className="text-sm text-neutral-600">
                                Are you sure you want to delete <strong className="text-black">{deleteRoomTypeModal.roomType?.name}</strong>?
                                This action cannot be undone.
                            </p>
                            <p className="text-sm text-neutral-600">
                                Type <strong>delete</strong> to confirm:
                            </p>
                            <input 
                                type="text" 
                                value={deleteConfirmationText}
                                onChange={(e)=>setDeleteConfirmationText(e.target.value)}
                                className="w-full p-2 border border-neutral-300 rounded-lg focus:border-red-500 outline-none"
                                placeholder="Type 'delete'"
                            />
                            <button 
                                onClick={handleDeleteRoomTypeConfirm}
                                disabled={deleteConfirmationText.toLowerCase() !== "delete"}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold tracking-wide w-full hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isManageRoomModalOpen && selectedRoomType && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-[450px] md:w-[450px] max-h-[90vh] bg-white rounded-2xl shadow-xl relative flex flex-col px-4 py-4 gap-4 overflow-y-auto">
                        <div className="flex justify-between items-center border-b-[1px] border-neutral-300 pb-2">
                            <h1 className="text-lg md:text-xl font-semibold">Manage Rooms - {selectedRoomType.name}</h1>
                            <button onClick={closeManageRoomModal} className="p-2">
                                <FaX size={15} className="text-neutral-800 hover:text-rose-500 hover:scale-105 transition"/>
                            </button>
                        </div>

                        <form className="flex gap-2 items-center" onSubmit={handleCreateRoom}>
                            <input
                                type="number"
                                placeholder="Room Number"
                                value={newRoomNumber}
                                onChange={(e)=>setNewRoomNumber(e.target.value)}
                                className="flex-1 p-3 text-sm border-[1px] border-neutral-300 rounded-lg focus:border-rose-600 focus:outline-none transition"
                                required
                            />
                            <button 
                                type="submit"
                                className="bg-rose-500 text-white px-4 py-3 rounded-lg font-semibold text-sm hover:bg-rose-600 transition flex items-center gap-2"
                            >
                                <FaPlus size={14}/>
                                Add Room
                            </button>
                        </form>

                        {isEditingRoom && editingRoom && (
                            <form className="flex gap-2 items-center bg-neutral-100 p-3 rounded-lg" onSubmit={handleUpdateRoom}>
                                <span className="text-sm text-neutral-600">Edit Room:</span>
                                <input
                                    type="number"
                                    placeholder="Room Number"
                                    value={editRoomNumber}
                                    onChange={(e)=>setEditRoomNumber(e.target.value)}
                                    className="flex-1 p-2 text-sm border-[1px] border-neutral-300 rounded-lg focus:border-rose-600 focus:outline-none transition"
                                    required
                                />
                                <button 
                                    type="submit"
                                    className="bg-rose-500 text-white px-3 py-2 rounded-lg font-semibold text-sm hover:bg-rose-600 transition"
                                >
                                    Save
                                </button>
                                <button 
                                    type="button"
                                    onClick={()=>{setIsEditingRoom(false); setEditingRoom(null); setEditRoomNumber("")}}
                                    className="bg-neutral-400 text-white px-3 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-500 transition"
                                >
                                    Cancel
                                </button>
                            </form>
                        )}

                        <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
                            {rooms.length > 0 ? (
                                rooms.map((room) => (
                                    <div key={room.id} className="flex items-center justify-between bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                                        <div className="flex items-center gap-3">
                                            <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-sm font-semibold">
                                                Room {room.roomNumber}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={()=>handleEditRoom(room)}
                                                className="p-2 text-rose-500 hover:bg-rose-100 rounded-lg transition"
                                            >
                                                <FaPencil size={14}/>
                                            </button>
                                            <button 
                                                onClick={()=>handleDeleteRoom(room.id)}
                                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                                            >
                                                <FaTrash size={14}/>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-6 text-neutral-500">
                                    <p className="text-sm">No rooms available</p>
                                    <p className="text-xs mt-1">Add a room above</p>
                                </div>
                            )}
                        </div>

                        <div className="border-t border-neutral-200 pt-3 text-sm text-neutral-500 text-center">
                            Total Rooms: {rooms.length}
                        </div>
                    </div>
                </div>
            )}

            {property ? (
                <>
                    <div className="min-h-[60px] md:h-25 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 md:mb-0">
                        <h1 className="text-xl md:text-2xl font-bold text-black">{property.name}</h1>
                        <button 
                            onClick={()=>setIsCreateRoomTypeModalOpen(true)} 
                            className="group rounded-full justify-center items-center flex bg-rose-500 px-4 md:px-8 py-2 md:py-3 gap-2 md:gap-3 text-white hover:cursor-pointer shadow-sm hover:shadow-md transition"
                        >
                            <FaPlus size={16} className="md:w-5 md:h-5 group-hover:rotate-90 group-hover:scale-105 transition duration-300"/>
                            <h1 className="font-semibold text-xs md:text-base">Create New Room Type</h1>
                        </button>
                    </div>
                    
                    <div className="gap-4 md:gap-5 flex flex-col">
                        {property.roomTypes.length > 0 ? (
                            <div className="flex flex-col gap-4 md:gap-5">
                                {property.roomTypes.map((roomType: RoomType) => (
                                    <div 
                                        key={roomType.id} 
                                        className="grid grid-cols-1 md:grid-cols-5 rounded-xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-4 md:p-5 gap-4 md:gap-5 items-center"
                                    >
                                        <div className="relative w-full aspect-video md:aspect-square rounded-xl overflow-hidden">
                                            <Image
                                                fill
                                                src={roomType.images[0]}
                                                alt={roomType.name}
                                                className="object-cover h-full w-full hover:scale-110 transition"
                                            />
                                        </div>
                                        
                                        <div className="flex flex-col gap-2">
                                            <h1 className="text-lg md:text-xl font-semibold">{roomType.name}</h1>
                                            <p className="text-sm md:text-base text-neutral-700 font-light line-clamp-2">{roomType.description}</p>
                                        </div>
                                        
                                        <div className="flex flex-row md:flex-col gap-4 md:gap-2 md:items-center">
                                            <p className="text-sm md:text-base text-neutral-700 font-semibold">
                                                Rp{Number(roomType.basePrice).toLocaleString("en-US")}
                                            </p>
                                            <p className="text-sm md:text-base text-neutral-700 font-semibold">
                                                {roomType.capacity} Guests
                                            </p>
                                        </div>
                                        
                                        <div className="flex flex-row md:flex-col gap-2 md:items-center">
                                            <p className="text-sm md:text-base text-neutral-700 font-semibold flex-1 md:flex-none">
                                                Rooms: {roomType.rooms.length}
                                            </p>
                                            <button 
                                                onClick={()=>openManageRoomModal(roomType)}
                                                className="text-xs md:text-sm bg-rose-500 text-white px-3 md:px-4 py-2 rounded-lg font-semibold tracking-wide md:w-full hover:cursor-pointer hover:bg-rose-600 transition"
                                            >
                                                Manage Room
                                            </button>
                                        </div>
                                        
                                        <div className="flex flex-row md:flex-col gap-2 md:items-center">
                                            <button 
                                                onClick={()=>handleEditRoomTypeClick(roomType)}
                                                className="flex-1 md:flex-none text-xs md:text-sm bg-rose-500 text-white px-3 md:px-4 py-2 rounded-lg font-semibold tracking-wide md:w-full hover:cursor-pointer hover:bg-rose-600 transition"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={()=>handleDeleteRoomTypeClick(roomType)}
                                                className="flex-1 md:flex-none text-xs md:text-sm bg-rose-500 text-white px-3 md:px-4 py-2 rounded-lg font-semibold tracking-wide md:w-full hover:cursor-pointer hover:bg-red-700 transition"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10 text-gray-500">
                                <p className="text-lg">No room types available</p>
                                <p className="text-sm mt-2">Click "Create New Room Type" to add one</p>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className="text-center py-10 text-gray-500">Invalid PropertyId</div>
            )}
        </div>
    )
}