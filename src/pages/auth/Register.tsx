import { authModalState } from '@/atoms/authModalAtom';
import { auth } from '@/firebase/firebase';
import { type } from 'os';
import React, { useEffect, useState } from 'react';
import {AiOutlineClose} from 'react-icons/ai';
import { useSetRecoilState } from 'recoil';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';

type RegisterProps = {
    
};

const Register:React.FC<RegisterProps> = () => {
    const router = useRouter();
     const setAuthModal = useSetRecoilState(authModalState);
     const [inputs,setInputs] = useState({email: '', password:'',displayName: ''})
     const [
          createUserWithEmailAndPassword,
          user,
          loading,
          error,
        ] = useCreateUserWithEmailAndPassword(auth);

     const handleClick = () => {
          setAuthModal((prev)=>({...prev , type: 'login'}));
     }

     const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
          setInputs({...inputs, [e.target.name]: e.target.value})
     }

     const handleSubmit =async (e:React.ChangeEvent<HTMLFormElement>) => {
               e.preventDefault();
               try {
                    if (!inputs.displayName || !inputs.email || !inputs.password) return alert('all the fields are required')
                    const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password)
                    if(!newUser) return;
                    router.push('/');
               } catch (error:any) {
                    alert(error.message);
               }
               
          }

          useEffect(() => {
               if (error) alert(error?.message);
          },[error])
    return (
        <form onSubmit={handleSubmit}>
           <h2 className='mt-2 font-sans font-bold text-2xl'>
                Signup to LeedCode 
           </h2>
           <div className='flex flex-col my-4 gap-3'>
                <label htmlFor="email">Email</label>
                <input onChange={handleChange} type="text" placeholder='Email@.com' name='email'  className='px-2 py-3 rounded-md border-[1px] border-gray-300 text-sm' />
                <label htmlFor="email">Display Name</label>
                <input onChange={handleChange} type="text" placeholder='John Doe' name='displayName'  className='px-2 py-3 bg-gray-500 text-white rounded-md border-[1px] border-gray-300 text-sm' />
                <label htmlFor="password">Password</label>
                <input onChange={handleChange} type="password" placeholder='your password' name='password'  className='px-2 py-3 rounded-md border-[1px] text-black border-gray-300 text-sm' />
           </div>
           <div className='mt-3 flex items-center text-center'>
                <button type='submit' className='px-2 hover:bg-yellow-500 py-3 mt-3 bg-brand-orange text-lg font-semibold rounded-md w-full  text-center '>{loading ? 'Registering...' : 'Register'}</button>
           </div>
            <p className='mt-4'>Already have an account?
                <span className='text-blue-500 hover:underline cursor-pointer ml-2' onClick={handleClick}>Login</span>
            </p>
        </form>
    )
}
export default Register;