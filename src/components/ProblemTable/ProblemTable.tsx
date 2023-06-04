import { problems } from '@/mockProblems/problem';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {BsCheckCircle} from 'react-icons/bs'
import {AiFillYoutube} from 'react-icons/ai'
import {IoClose} from 'react-icons/io5'
import Youtube from 'react-youtube'
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { firebase } from '@/firebase/firebase';
import _ from 'lodash';
import { DBProblem } from '../../../utils/Types/problem';


type ProblemTableProps = {
    setLoadingProblem: React.Dispatch<React.SetStateAction<boolean>>
};

const ProblemTable:React.FC<ProblemTableProps> = ({setLoadingProblem}) => {
    const [openModal, setOpenModal] = useState(false);
    const [id, setId] = useState(null);

    let problems = useGetProblems(setLoadingProblem);
    problems = _.uniqBy(problems, function (e) {
        return e.id;
      });
    problems = _.orderBy(problems,['order'], ['asc']);

    const open = (id: any)=>{
        setOpenModal(true);
        setId(id);
    }

    const handleOpenModal = () => setOpenModal(!openModal);
    return (
        <>
        <tbody className='text-white'>
            {   
                problems.map((problem,idx)=>{
                    const differentColor = problem.difficulty === 'Easy' ? 'text-dark-green-s': problem.difficulty === 'Medium' ? 'text-dark-yellow': 'text-dark-pink'
                    return (
                    <tr className={`${idx % 2 == 1 ? 'bg-dark-layer-1': ''}`} key={problem.id}>
                        <th className='px-2 py-4 font-medium flex-nowrap text-dark-green-s'>
                            <BsCheckCircle fontSize={'18'} className='w-18'/>
                        </th>
                        <td className='px-6 py-2'>
                            <Link href={`/problems/${problem.id}`} className='hover:text-blue-600 cursor-pointer'>
                                {problem.title}
                            </Link>
                        </td>
                        <td className={`${differentColor} px-6 py-4`}>
                            {problem.difficulty}
                        </td>
                        <td className="px-6 py-4">
                            {problem.category}
                        </td>
                        <td className='px-6 py-4'>
                            {
                                problem.videoId ? (
                                    <AiFillYoutube size={28} className='cursor-pointer hover:text-red-500' onClick={()=>open(problem.videoId)}/>
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

 function useGetProblems(setLoadingProblem: React.Dispatch<React.SetStateAction<boolean>>){
    const [problems, setProblems] = useState<DBProblem[]>([]);
    const tmp: DBProblem[] = [];
    useEffect(()=>{
        setLoadingProblem(true);
        const fetchProblems = async ()=>{
            const q = query(collection(firebase, "problems"));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                tmp.push({id: doc.id,...doc.data().newDocument} as DBProblem);
              });
              setProblems(tmp);
              setLoadingProblem(false);
        }

        fetchProblems();
    },[setLoadingProblem])
    return problems;
}