import { authModalState } from '@/atoms/authModalAtom';
import { type } from 'os';
import React from 'react';
import {AiOutlineClose} from 'react-icons/ai';
import { useSetRecoilState } from 'recoil';

type RegisterProps = {
    
};

const Register:React.FC<RegisterProps> = () => {
    
     const setAuthModal = useSetRecoilState(authModalState);

     const handleClick = () => {
          setAuthModal((prev)=>({...prev , type: 'login'}));
     }
    return (
        <>
           <h2 className='mt-2 font-sans font-bold text-2xl'>
                Signup to LeedCode 
           </h2>
           <div className='flex flex-col my-4 gap-3'>
                <label htmlFor="email">Email</label>
                <input type="text" placeholder='Email@.com' name='email' value='' className='px-2 py-3 rounded-md border-[1px] border-gray-300 text-sm' />
                <label htmlFor="email">Display Name</label>
                <input type="text" placeholder='John Doe' className='px-2 py-3 bg-gray-500 text-white rounded-md border-[1px] border-gray-300 text-sm' />
                <label htmlFor="password">Password</label>
                <input type="password" placeholder='your password' name='password' value='' className='px-2 py-3 rounded-md border-[1px] border-gray-300 text-sm' />
           </div>
           <div className='mt-3 flex items-center text-center'>
                <button className='px-2 hover:bg-yellow-500 py-3 mt-3 bg-brand-orange text-lg font-semibold rounded-md w-full  text-center '>Register</button>
           </div>
            <p className='mt-4'>Already have an account?
                <span className='text-blue-500 hover:underline cursor-pointer ml-2' onClick={handleClick}>Login</span>
            </p>
        </>
    )
}
export default Register;