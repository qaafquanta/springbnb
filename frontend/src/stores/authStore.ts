import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAuthStore {
  user:{
    name:string;
    email:string;
    role:string;
    profilePicture:string;
  },
  login: (userParam) => void;
}

const useAuthStore = create(persist((set) => ({
    //STATE
    user:{
        name:"",
        email:"",
        role:"",
        profilePicture:""
    },

    //ACTION
    login: (userParam) => {
      if (userParam) {
        set(() => ({ user: userParam }));
      }
    },

    // Clear user (logout)
    clearUser: () => set({
        user: {
          name: "",
          email: "",
          role: "",
          profilePicture: ""
        }
    }),

//     addToCart: (newPhoto) =>
//         set((state) => ({
//         cart: [...state.cart, newPhoto]
//     })),

//     removePhotoFromCart: (photoId) =>
//         set((state) => ({
//         cart: state.cart.filter((photo) => photo.id !== photoId),
//     })),

//     togglePhotoCheck: (index) => 
//       set((state) => ({
//         cart: state.cart.map((photo, i) => 
//           i === index 
//             ? { ...photo, isChecked: !photo.isChecked } 
//             : photo
//         )
//     })),
    
}),
{name: 'auth-store'}
));

export default useAuthStore;