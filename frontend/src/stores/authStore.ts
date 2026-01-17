import { create } from "zustand";

interface IAuthStore {
  user:{
    name:string;
    email:string;
    role:string;
    profilePicture:string;
  }|null;
  login: (userParam: any) => void;
  clearUser: () => void;
  updateUser: (userData: any) => void;
}

const useAuthStore = create<IAuthStore>((set) => ({
    user:{
        name:"",
        email:"",
        role:"",
        profilePicture:""
    },

    login: (userParam: any) => {
      if (userParam) {
        set(() => ({ user: userParam }));
      }
    },

    clearUser: () => set({
        user: {
          name: "",
          email: "",
          role: "",
          profilePicture: ""
        }
    }),

    updateUser: (userData: any) => set((state: any) => ({
        user: { ...state.user, ...userData }
    })),
  }))

export default useAuthStore;