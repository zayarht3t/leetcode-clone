import React from 'react';
import {AiOutlineSetting,AiOutlineFullscreen} from 'react-icons/ai'

type PreferenceNavProps = {
    
};

const PreferenceNav:React.FC<PreferenceNavProps> = () => {
    
    return (
<div className=' bg-dark-layer-1 overflow-y-hidden w-full'>
    <div className='flex bg-dark-layer-2 items-center justify-between px-3'>
        <div className=' h-12 rounded-t-md p-2'>
            <p className='text-white text-md p-1 border-t-gray-100 bg-dark-layer-1 w-fit rounded-t-md'>Javascript</p>
            
        </div>
        <div className='relative flex items-center justify-center gap-2 cursor-pointer'>
            <div>
                <AiOutlineSetting size={25} className='text-white'/>
                <div className='absolute  p-2 rounded bg-dark-layer-1 top-10 w-auto z-10  scale-0 hover:scale-100'>
                            <p className=' text-white transition ease-in-out duration-300 absolute'>Setting</p>
                </div>
        
            </div>
            
            <AiOutlineFullscreen size={25} className='text-white'/>
        </div>

    </div>

    </div>

    )
}
export default PreferenceNav;