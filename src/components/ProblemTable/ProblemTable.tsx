import { problems } from '@/mockProblems/problem';
import Link from 'next/link';
import React, { useState } from 'react';
import {BsCheckCircle} from 'react-icons/bs'
import {AiFillYoutube} from 'react-icons/ai'
import {IoClose} from 'react-icons/io5'
import Youtube from 'react-youtube'

type ProblemTableProps = {
    
};

const ProblemTable:React.FC<ProblemTableProps> = () => {
    const [openModal, setOpenModal] = useState(false);
    const [id, setId] = useState(null);

    const open = (id: any)=>{
        setOpenModal(true);
        setId(id);
    }

    const handleOpenModal = () => setOpenModal(!openModal);
    return (
        <>
        <tbody className='text-white'>
            {
                problems.map((doc,idx)=>{
                    const differentColor = doc.difficulty === 'Easy' ? 'text-dark-green-s': doc.difficulty === 'Medium' ? 'text-dark-yellow': 'text-dark-pink'
                    return (
                    <tr className={`${idx % 2 == 1 ? 'bg-dark-layer-1': ''}`} key={doc.id}>
                        <th className='px-2 py-4 font-medium flex-nowrap text-dark-green-s'>
                            <BsCheckCircle fontSize={'18'} className='w-18'/>
                        </th>
                        <td className='px-6 py-2'>
                            <Link href={`/problems/${doc.id}`} className='hover:text-blue-600 cursor-pointer'>
                                {doc.title}
                            </Link>
                        </td>
                        <td className={`${differentColor} px-6 py-4`}>
                            {doc.difficulty}
                        </td>
                        <td className="px-6 py-4">
                            {doc.category}
                        </td>
                        <td className='px-6 py-4'>
                            {
                                doc.videoId ? (
                                    <AiFillYoutube size={28} className='cursor-pointer hover:text-red-500' onClick={()=>open(doc.videoId)}/>
                                ) :(
                                    <p className='text-gray-400 font-medium'>Coming soon</p>
                                )
                            }
                        </td>
                    </tr>
                )}                        
                    )
            }
        </tbody>
        {
            openModal && (
        <tfoot className=' w-screen h-screen fixed top-0 left-0 flex items-center  justify-center'>
            <div className='w-screen h-screen z-10 bg-black bg-opacity-70 absolute'></div>
                <div className='w-full h-full z-50 px-6 relative max-w-4xl'>
                    <div className='w-full h-full flex items-center justify-center relative'>
                        <div className='w-full relative'>
                            <IoClose className='text-white absolute -top-16 right-0 cursor-pointer' size={28} onClick={handleOpenModal}/>
                            <Youtube videoId={id || ''} loading='lazy' iframeClassName='w-full min-h-[500px]'/>
                        </div>
                    </div>
                </div>
        </tfoot>                  
            )
        }
      
        </>

    )
    }
export default ProblemTable;