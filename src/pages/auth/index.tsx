import Navbar from '@/components/Navbar';
import React from 'react';
import Login from './Register';
import AuthModal from './AuthModal';
import {useRecoilValue} from 'recoil'
import { authModalState } from '@/atoms/authModalAtom'

type indexProps = {
    
};

const index:React.FC<indexProps> = () => {
    const authModal = useRecoilValue(authModalState);
    
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