import {create} from 'zustand';
import useLoginStore from './loginStore';
import api from '../api/axios';


 const usecheckAdmin = create((set) => ({
    isAdmin : false,

    checkAdmin : async () => {
        const email = useLoginStore.getState().email;
        if(!email)return;

        try{
            const response = await api.post('/check-admin', {email});

            set({
                isAdmin : response.data.isAdmin
            })
        }catch(error){
            console.log(error);
            set({
                isAdmin : false
            })
        }
    }

 }));
 export default usecheckAdmin;