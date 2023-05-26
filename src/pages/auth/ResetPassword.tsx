import React from 'react';

type ResetPasswordProps = {
    
};

const ResetPassword:React.FC<ResetPasswordProps> = () => {
    
    return (
        <>
            <h2 className=' my-4 text-2xl font-bold'>Reset Password</h2>
            <p>Forgotten your password? Enter your email address below, and we'll send your e-mail allowing you to reset it.</p>
            <div className='flex flex-col my-4 gap-3'>
   <label htmlFor="email">Email</label>
            <input type="text" placeholder='Email@.com' name='email' value='' className='px-2 py-3 rounded-md border-[1px] border-gray-300 text-sm' />
            </div>
         
            <div className='mt-3 flex items-center text-center'>
                <button className='px-2 py-3 mt-3 bg-brand-orange text-lg font-semibold rounded-md w-full  text-center hover:bg-yellow-500 '>Reset Password</button>
           </div>
        </>
    )
}
export default ResetPassword;