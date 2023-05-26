import Navbar from '@/components/Navbar';
import React from 'react';
import Login from './Login';
import AuthModal from './AuthModal';

type indexProps = {
    
};

const index:React.FC<indexProps> = () => {
    
    return (
        <div className='w-full h-screen relative bg-gradient-to-b from-gray-600 to-black'>
            <div className='max-w-7xl mx-auto'>
                <Navbar/>
                <div className='flex items-center justify-center h-[calc(100vh-5rem)] '>
                    <img src={'/hero.png'} alt="" />
                    <AuthModal/>
                </div>
                
            </div>
        </div>
    )
}
export default index;