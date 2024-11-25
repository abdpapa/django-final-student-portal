import { create } from 'zustand'

export const useStor = create((set) => ({
  current_user:null,
  is_student:null,
  setuser: () =>  {

    set((state) => ({ current_user: state.usernames}))
  },
  setUserStatus: (flag) => set(() => ({ is_student: flag})),
}))
