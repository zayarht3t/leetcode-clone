import React, { useEffect, useState } from 'react';
import {FiRefreshCcw} from 'react-icons/fi'
import {BsClock} from 'react-icons/bs'
type TimerProps = {
    
};

const Timer:React.FC<TimerProps> = () => {
    const [showTimer,setShowTimer] = useState(false);
    const [time,setTime] = useState<number>(0);

    const handleTimer = () => {
        setShowTimer(!showTimer);
    }

    const formatTime = (Time: number): string => {
        const hours = Math.floor(Time / 3600);
        const minutes = Math.floor((Time % 3600) / 60);
        const seconds = Math.floor(Time % 60);
        return `${hours < 10? `0${hours}` : hours}:${minutes < 10? `0${minutes}` : minutes}:${seconds < 10? `0${seconds}` : seconds}`;
    }

    useEffect(()=>{
        let intervalId : NodeJS.Timeout;
        if(showTimer){
            intervalId = setInterval(()=>{
                setTime((time) => time + 1);
            },1000)            
        }

       return () =>clearInterval(intervalId);

    },[showTimer])
    
    return (
        <div className='flex items-center justify-center p-2 rounded mx-2 bg-dark-fill-2 cursor-pointer'>
            {
                showTimer ? (
                    <div className='flex items-center justify-center gap-2'>
                    <p className='text-white font-medium'>{formatTime(time)}</p>
                    <FiRefreshCcw size={27} className='text-white' onClick={handleTimer}/>                        
                    </div>

                ):
                (
                    <div>
                        
                        <BsClock size={27} className='text-white' onClick={handleTimer}/>
                    </div>
                    
                )
            }
            
        </div>
        
    )
}
export default Timer;