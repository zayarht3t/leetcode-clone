import { auth } from '@/firebase/firebase';
import React, { useEffect, useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
type ResetPasswordProps = {
    
};

const ResetPassword:React.FC<ResetPasswordProps> = () => {
    const [email, setEmail] = useState("");
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(
        auth
      );
      
useEffect(() => {
        if(error){
            return alert(error.message);
        }
    },[error])


    const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      const success = await sendPasswordResetEmail(
            email
          );
          if (success) {
            toast.success("Password reset email sent",{position: 'top-center', autoClose: 3000});
          }
        }

        return (
        <form onSubmit={sendEmail}>
            <h2 className=' my-4 text-2xl font-bold'>Reset Password</h2>
            <p>Forgotten your password? Enter your email address below, and we'll send your e-mail allowing you to reset it.</p>
            <div className='flex flex-col my-4 gap-3'>
   <label htmlFor="email">Email</label>
            <input type="text" onChange={(e)=>setEmail(e.target.value)} placeholder='Email@.com' name='email' value='' className='px-2 py-3 rounded-md border-[1px] border-gray-300 text-sm' />
            </div>
         
            <div className='mt-3 flex items-center text-center'>
                <button type='submit' className='px-2 py-3 mt-3 bg-brand-orange text-lg font-semibold rounded-md w-full  text-center hover:bg-yellow-500 '>Reset Password</button>
           </div>
        </form>
    )
    }
    
    
export default ResetPassword;