import Link from 'next/link';
import React from 'react';

type NavbarProps = {
    
};

const Navbar:React.FC<NavbarProps> = () => {
    
    return (
        <div className='flex items-center justify-between px-2 sm:px-12 md:px-24'>
            <Link href={'/'} className='flex items-center justify-center h-20' >
                <img src={'/logo(1).png'} alt="" className='h-full' />
            </Link>
            <div className='flex items-center justify-center'>
                <button className='px-2 py-1 md:px-4 md:py-2 bg-brand-orange border-2 rounded-md font-medium border-transparent text-white transition ease-in-out duration-300 hover:bg-white hover:text-brand-orange'>Sign In</button>
            </div>
        </div>
    )
}
export default Navbar;