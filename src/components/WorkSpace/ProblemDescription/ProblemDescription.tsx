import React from 'react';
import {BsCheckCircle} from 'react-icons/bs'
import {AiFillLike,AiFillDislike} from 'react-icons/ai'

type ProblemDescriptionProps = {
    
};

const ProblemDescription:React.FC<ProblemDescriptionProps> = () => {

    
    return <div className='h-[100vh] bg-dark-layer-1 overflow-y-auto'>
        <div className='bg-dark-layer-2 h-12 rounded-t-md p-2'>
            <p className='text-white text-md p-2 border-t-gray-100 bg-dark-layer-1 w-fit rounded-t-md'>Description</p>
            <div className='mt-4 p-2  flex flex-col gap-4'>
                <h2 className='text-white font-bold text-2xl'>1. Two Sum</h2>
                <div className='flex gap-10 items-center cursor-pointer'>
                    <div className='py-1.5 px-3 opacity-70 rounded-[21px] bg-olive'>
                        <p className='text-white opacity-100 '>Easy</p>
                    </div>
                    <BsCheckCircle size={25} className='text-olive'/>
                    <div className='flex gap-1 items-center'>
                        <AiFillLike size={28} className='text-gray-400'/>
                        <p className='text-gray-400'>120</p>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <AiFillDislike size={28} className='text-gray-400'/>
                        <p className='text-gray-400'>2</p>
                    </div>
                </div>
                <div className='flex flex-col gap-4 w-11/12'>
                    <p className='text-white text-lg'>Given an array of integers <span className='w-fit px-2 py-1 rounded bg-dark-layer-1 shadow-md'>nums</span>
                    and an integer <span className='w-fit px-2 py-1 rounded bg-dark-layer-1 shadow-md'>targets</span>
                    ,return<span className='italic'>indices of the two numbers such that they add up to <span className='w-fit px-2 py-1 rounded bg-dark-layer-1 shadow-md'>nums</span></span>
                    </p>
                    <p className='text-white text-lg'>
                        you may assume that each input would have <span className='font-bold'> exactly one solution</span>,
                        and you may not use the same element twice.
                    </p>
                    <p className='text-white text-lg'>
                        You can return the answer in any order.
                    </p>
                </div>
            <div className='w-full'>
                <div className=' my-4 flex flex-col w-5/6 mx-2 '>
                    <h1 className='font-bold text-xl my-3 text-white'>Example 1:</h1>
                    <div className=' bg-dark-fill-3 p-3 rounded-md flex items-start pl-4 flex-col gap-2'>
                        <p>
                            <span className='text-white font-bold text-lg'>Input: </span>
                            <span className='text-lg text-dark-gray-7'>  nums = [2,7,11,15], target = 9</span>
                        </p>
                        <p>
                            <span className='text-white font-bold text-lg'>Output: </span>
                            <span className='text-lg text-dark-gray-7'> [0,1]</span>
                        </p>
                        <p>
                            <span className='text-white font-bold text-lg'>Explanation: </span>
                            <span className='text-lg text-dark-gray-7'> Because nums[0] + nums[1] == 9, we return [0,1]</span>
                        </p>
                    </div>
                </div>
                
            </div>
            <div className='w-full'>
                <div className=' my-4 flex flex-col w-5/6 mx-2 '>
                    <h1 className='font-bold text-xl my-3 text-white'>Example 2:</h1>
                    <div className=' bg-dark-fill-3 p-3 rounded-md flex items-start pl-4 flex-col gap-2'>
                        <p>
                            <span className='text-white font-bold text-lg'>Input: </span>
                            <span className='text-lg text-dark-gray-7'>  nums = [3,2,4], target = 6</span>
                        </p>
                        <p>
                            <span className='text-white font-bold text-lg'>Output: </span>
                            <span className='text-lg text-dark-gray-7'> [1,2]</span>
                        </p>
                        <p>
                            <span className='text-white font-bold text-lg'>Explanation: </span>
                            <span className='text-lg text-dark-gray-7'> Because nums[1] + nums[2] == 6, we return [1,2]</span>
                        </p>
                    </div>
                </div>
                
            </div>
            <div className='w-full'>
                <div className=' my-4 flex flex-col w-5/6 mx-2 '>
                    <h1 className='font-bold text-xl my-3 text-white'>Example 3:</h1>
                    <div className=' bg-dark-fill-3 p-3 rounded-md flex items-start pl-4 flex-col gap-2'>
                        <p>
                            <span className='text-white font-bold text-lg'>Input: </span>
                            <span className='text-lg text-dark-gray-7'>  nums = [3,3], target = 6</span>
                        </p>
                        <p>
                            <span className='text-white font-bold text-lg'>Output: </span>
                            <span className='text-lg text-dark-gray-7'> [0,1]</span>
                        </p>
                        <p>
                            <span className='text-white font-bold text-lg'>Explanation: </span>
                            <span className='text-lg text-dark-gray-7'> Because nums[0] + nums[1] == 9, we return [0,1]</span>
                        </p>
                    </div>
                </div>
                
            </div>

            <div className='mt-2 p-4 ml-2'>
                <ul className='text-white list-disc'>
                    <li className="mt-2">
                        <code>2  nums.length  10 </code>
                    </li>
                    <li className="mt-2">
                        <code>2  nums.length  10 </code>
                    </li>
                    <li className="mt-2">
                        <code>2  nums.length  10 </code>
                    </li>
                    <li className='mt-2 text-sm'>
                        <strong>Only one answer can exit</strong>
                    </li>
                </ul>   
            </div>

        </div>
             
            
        </div>
    </div>
}
export default ProblemDescription;