import React, { useEffect, useState } from 'react';
import {AiOutlineSetting,AiOutlineFullscreen} from 'react-icons/ai'
import { ISettings } from '../Playground';
import SettingsModal from '@/components/Modals/SettingModal';

type PreferenceNavProps = {
    settings: ISettings,
    setSettings: React.Dispatch<React.SetStateAction<ISettings>>
    
};

const PreferenceNav:React.FC<PreferenceNavProps> = ({settings,setSettings}) => {
    const [isFullscreen,setIsFullscreen] = useState(false);

    const handleFullscreen = ()=>{
        if(isFullscreen){
            document.exitFullscreen();
        }else {
            document.documentElement.requestFullscreen();
        }
        setIsFullscreen(!isFullscreen);
    }

    useEffect(() => {
		function exitHandler(e: any) {
			if (!document.fullscreenElement) {
				setIsFullscreen(false);
				return;
			}
			setIsFullscreen(true);
		}

		if (document.addEventListener) {
			document.addEventListener("fullscreenchange", exitHandler);
			document.addEventListener("webkitfullscreenchange", exitHandler);
			document.addEventListener("mozfullscreenchange", exitHandler);
			document.addEventListener("MSFullscreenChange", exitHandler);
		}
	}, [isFullscreen]);
    
    return (
<div className=' bg-dark-layer-1 overflow-y-hidden w-full'>
    <div className='flex bg-dark-layer-2 items-center justify-between px-3'>
        <div className=' h-12 rounded-t-md p-2'>
            <p className='text-white text-md p-1 border-t-gray-100 bg-dark-layer-1 w-fit rounded-t-md'>Javascript</p>
            
        </div>
        <div className='relative flex items-center justify-center gap-2 cursor-pointer'>
            <div>
                <AiOutlineSetting size={25} className='text-white' onClick={() => setSettings({ ...settings, settingsModalIsOpen: true })}/>
                <div className='absolute  p-2 rounded bg-dark-layer-1 top-10 w-auto z-10  scale-0 hover:scale-100'>
                            <p className=' text-white transition ease-in-out duration-300 absolute'>Setting</p>
                </div>

        
            </div>
            
            <AiOutlineFullscreen size={25} className='text-white' onClick={handleFullscreen}/>
        </div>

    </div>
    {
        settings.settingsModalIsOpen && <SettingsModal settings={settings} setSettings={setSettings}/>
    }

    </div>

    )
}
export default PreferenceNav;