import React from 'react';
import Login from './Login';
import Register from './Register';
import ResetPassword from './ResetPassword';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';

type AuthModalProps = {
};

const AuthModal:React.FC<AuthModalProps> = () => {
    const authModal = useRecoilValue(authModalState);
    const setAuthModal = useSetRecoilState(authModalState);
    
    const handleOpen = ()=>{
        setAuthModal((prev)=>({...prev,isOpen: !authModal.isOpen,type: 'login'}));
    }
    return (
        <div className='absolute bg-gradient-to-b shadow-md from-brand-orange to-gray-900 rounded-md mx-auto z-40 w-5/6 sm:w-[450px] px-6 py-4 text-white'>
           <div className='flex items-center justify-end'>
                <div onClick={handleOpen}  className='text-white font-bold cursor-pointer p-2 border-2 border-black rounded-full'>X</div>
            </div>
            {authModal.type === 'login' ? <Login/> : authModal.type === 'register' ? <Register/> : <ResetPassword/> }
        </div>
    )
    
}
export default AuthModal;