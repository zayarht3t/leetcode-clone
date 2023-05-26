import React from 'react';
import Login from './Login';
import Register from './Register';
import ResetPassword from './ResetPassword';

type AuthModalProps = {
};

const AuthModal:React.FC<AuthModalProps> = () => {
    
    return (
        <div className='absolute bg-gradient-to-b shadow-md from-brand-orange to-gray-900 rounded-md mx-auto z-40 w-5/6 sm:w-[450px] px-6 py-4 text-white'>
           <div className='flex items-center justify-end'>
                <div  className='text-white font-bold cursor-pointer p-2 border-2 border-black rounded-full'>X</div>
            </div>
            <ResetPassword/>
        </div>
    )
    
}
export default AuthModal;