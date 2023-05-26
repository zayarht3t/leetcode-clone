import Navbar from '@/components/Navbar';
import React, { useEffect, useState } from 'react';
import Login from './Register';
import AuthModal from './AuthModal';
import {useRecoilValue} from 'recoil'
import { authModalState } from '@/atoms/authModalAtom'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/router';

type indexProps = {
    
};

const index:React.FC<indexProps> = () => {
    const authModal = useRecoilValue(authModalState);
    const [user,error,loading] = useAuthState(auth);
    const router = useRouter();
    const [pageLoading,setPageLoading] = useState(true);

    useEffect(()=>{
        if(user){
            router.push('/');
            if(!loading && !user) setPageLoading(false);
        }
    },[user,router])

    if(pageLoading) return null;
    
    return (
        <div className='w-full h-screen relative bg-gradient-to-b from-gray-600 to-black'>
            <div className='max-w-7xl mx-auto'>
                <Navbar/>
                <div className='flex items-center justify-center h-[calc(100vh-5rem)] '>
                    <img src={'/hero.png'} alt="" />
                    {authModal.isOpen && <AuthModal/> }
                    
                </div>
                
            </div>
        </div>
    )
}
export default index;