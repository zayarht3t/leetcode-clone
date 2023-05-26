import { problems } from '@/mockProblems/problem';
import Link from 'next/link';
import React from 'react';
import {BsCheckCircle} from 'react-icons/bs'

type ProblemTableProps = {
    
};

const ProblemTable:React.FC<ProblemTableProps> = () => {
    
    return (
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

                    </tr>
                )}                        
                    )

            }
        </tbody>
    )
    }
export default ProblemTable;