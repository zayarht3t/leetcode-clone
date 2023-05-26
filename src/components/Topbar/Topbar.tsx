import Link from 'next/link';
import React from 'react';

type TopbarProps = {
    
};

const Topbar:React.FC<TopbarProps> = () => {
    
    return (
        <nav className='w-full h-[70px] items-center bg-dark-layer-1 text-dark-fill-3 px-5 py-2'>
            <div className='max-w-[1200px] flex items-center justify-between mx-auto '>
                <Link href={'/'} className='w-full'>
                    <img src={'/logo-full.png'} alt="" />
                </Link>
                <div className='flex flex-row items-center gap-3 justify-center '>
                    <button className='bg-dark-fill-3 cursor-pointer py-2 px-3 rounded-md text-brand-orange hover:bg-dark-fill-2'>Premium</button>
                    <button className='bg-dark-fill-3 py-2 px-3 rounded-md text-white'>SignIn</button>
                </div>
            </div>
        </nav>
    )
}
export default Topbar;