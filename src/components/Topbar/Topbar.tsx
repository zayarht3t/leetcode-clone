import { auth } from '@/firebase/firebase';
import Link from 'next/link';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Logout from '../Buttons/Logout';
import {BsChevronLeft,BsChevronRight} from 'react-icons/bs'
import {BsList} from 'react-icons/bs'
import Timer from '../Timer/Timer';

type TopbarProps = {
    problemPage?: boolean,
};

const Topbar:React.FC<TopbarProps> = ({problemPage}) => {
    const [user,error,loading] = useAuthState(auth);
    
    return (
        <nav className='w-full h-[70px] items-center bg-dark-layer-1 text-dark-fill-3 px-5 py-2'>
            <div className='max-w-[1200px] flex items-center justify-between mx-auto '>
                <Link href={'/'} >
                    <img src={'/logo-full.png'} alt="" />
                </Link>
                {
                    <div className='flex flex-1 items-center justify-center'>
                        <div className='flex items-center justify-center gap-3 cursor-pointer'>
                            <div className='py-1.5 px-1 rounded bg-dark-fill-3 hover:bg-dark-fill-2 '>
                                <BsChevronLeft size={28} className='text-white'/>
                            </div>
                            <div className='font-medium flex items-center justify-between gap-2'>
                                <BsList size={23} className='text-white'/>
                                <p className='text-white font-medium'>Problem List</p>
                            </div>
                            <div className='py-1.5 px-1 rounded bg-dark-fill-3 hover:bg-dark-fill-2 '>
                                <BsChevronRight size={28} className='text-white'/>
                            </div>
                        </div>

                    </div>
                }
                <div className='flex flex-row items-center gap-3 justify-center '>
                    <button className='bg-dark-fill-3 cursor-pointer py-3 px-3 rounded-md text-brand-orange hover:bg-dark-fill-2'>Premium</button>
                </div>
                {
                        !user ? (
                               <button className='bg-dark-fill-3 py-2 px-3 rounded-md text-white ml-2'>SignIn</button>
                        ) :
                        (
                            <>
                        {
                            problemPage && <Timer/>
                        }
                 <div className='cursor-pointer group relative ml-3 flex items-center'>
                        
                        <img src="/avatar.png" alt="avator" className='w-10 h-10 rounded-full' />
                        <div
								className='absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg 
								z-40 group-hover:scale-100 scale-0 
								transition-all duration-300 ease-in-out'
							>
								<p className='text-sm'>{user?.email}</p>
							</div>
                        
                    </div>
                    <Logout/>
                            </>                            
                        )
                    }
   
            </div>
        </nav>
    )
}
export default Topbar;