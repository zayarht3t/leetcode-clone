import { authModalState } from '@/atoms/authModalAtom';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';

type LoginProps = {
    
};

const Login:React.FC<LoginProps> = () => {
    const router = useRouter();
    const setAuthModal = useSetRecoilState(authModalState);
    const [inputs,setInputs] = useState({email: '', password: ''});
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

    const handleclick = () => {
        setAuthModal((prev)=>({...prev,type: 'register'}));
    }

    const handlePassword = () => {
        setAuthModal((prev)=>({...prev,type: 'forgetPassword'}));
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputs({...inputs, [e.target.name]: e.target.value})
   }

    const handleLogin = async(e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if(!inputs.password || !inputs.email) return alert('all the fields are required');
            const user = await signInWithEmailAndPassword(inputs.email, inputs.password);
            if(!user) return;
            router.push('/');

        } catch (error:any) {
            alert(error.message);
        }
        
        
    }

    useEffect(()=>{
        if(error) return alert(error?.message)
    },[error])

    
    return (
        <form onSubmit={handleLogin}>
           <h2 className='mt-2 font-sans font-bold text-2xl'>
                Sign In to LeedCode 
           </h2>
           <div className='flex flex-col my-4 gap-3'>
                <label htmlFor="email">Email</label>
                <input onChange={handleChange} type="text" placeholder='Email@.com' name='email'  className='px-2 py-3 rounded-md border-[1px] border-gray-300 text-sm' />
                <label htmlFor="password">Password</label>
                <input onChange={handleChange} type="password" placeholder='your password' name='password' className='px-2 text-black py-3 rounded-md border-[1px] border-gray-300 text-sm' />
           </div>
           <div onClick={handlePassword} className='flex justify-end items-center text-blue-500 cursor-pointer hover:underline'>
                forget password?
           </div>
           <div className='mt-3 flex items-center text-center'>
                <button type='submit' className='px-2 py-3 hover:bg-yellow-500 mt-3 bg-brand-orange text-lg font-semibold rounded-md w-full  text-center '>{loading ? 'Logging...' : 'Login'}</button>
           </div>
            <p className='mt-4'>Don't have an account?
                <span className='text-blue-500 hover:underline cursor-pointer ml-2' onClick={handleclick}>Register</span>
            </p>
        </form>
    )
}
export default Login;