'use client'
import {useEffect,useState} from 'react';

export default function CreateProperty() {
    const [formData,setFormData]= useState({
        name:"",
        description:"",
        city:"",
        address:"",
        categoryId:"",
    })

    const [propertyCategories,setPropertyCategories] = useState(null)

    useEffect(()=>{
        const fetchPropertyData = async()=>{
            const response = await fetch('http://localhost:8000/property/fetch-create-property-page')
            const data = await response.json()
            console.log(data)
            setPropertyCategories(data.result)
        }
        fetchPropertyData()
    },[])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = new FormData();
        console.log(formData)
        form.append("name",formData.name)
        form.append("description",formData.description)
        form.append("city",formData.city)
        form.append("address",formData.address)
        form.append("categoryId",formData.categoryId)
        if(imageFile){
            form.append("imageUrl",imageFile)
        }
        try{
            const response = await fetch('http://localhost:8000/property/create-property', {
                method: "POST",
                body: form,
                credentials: "include"
            });
            const data = await response.json()
            console.log(data)
            if (!response.ok) {
                throw new Error('Failed to create property cause response');
            }
            alert("Property created successfully")
            setFormData({name:"",description:"",city:"",address:"",categoryId:""})
            setPreview(null)
            setImageFile(null)
            console.log(data)
        }catch(err){
            console.error(err)
            alert("Failed to create property")
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

    return (
    <main className="bg-white w-full min-h-screen text-black flex flex-col items-center justify-center font-sans">
            <div className="max-w-3xl w-full mx-auto p-4 flex flex-col gap-4  justify-center">
                <h1 className="text-2xl font-medium">Create new property</h1>
                <form className="flex flex-col gap-4 items-center w-full justify-center" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Property name" required  onChange={(e)=>handleChange(e)} name="name" value={formData.name} className='w-full p-2 border-[1px] border-neutral-300 rounded-lg active:border-rose-600 focus:border-rose-600 transition'></input>
                    <input type="textbox" placeholder="Property description" required  onChange={(e)=>handleChange(e)} name="description" value={formData.description} className='w-full p-2 border-[1px] border-neutral-300 rounded-lg active:border-rose-600 focus:border-rose-600 transition'></input>
                    <input type="text" placeholder="Property city" required  onChange={(e)=>handleChange(e)} name="city" value={formData.city} className='w-full p-2 border-[1px] border-neutral-300 rounded-lg active:border-rose-600 focus:border-rose-600 transition'></input>
                    <input type="text" placeholder="Property address" required  onChange={(e)=>handleChange(e)} name="address" value={formData.address} className='w-full p-2 border-[1px] border-neutral-300 rounded-lg active:border-rose-600 focus:border-rose-600 transition'></input>
                    <select
                        id="property-category"
                        value={formData.categoryId}
                        onChange={(e)=>handleChange(e)}
                        name="categoryId"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                    >
                        {propertyCategories?.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                        ))}
                    </select>
                        <img src={preview} className="w-32 h-32 object-cover" />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />


                    <button type="submit" className="bg-rose-600 text-white px-4 py-2 rounded-lg font-semibold tracking-wide w-full">Create Property</button>

                </form>
            </div>
        </main>
  )
}
