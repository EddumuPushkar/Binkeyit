import {create} from 'zustand'

const loginStore = (set) => ({
    email : '',

    setEmail: ({email}) => set ((state) => ({
        email : email ?? state.email
    }))
})

const useLoginStore = create(loginStore);
export default useLoginStore;