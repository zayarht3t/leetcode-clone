import Image from 'next/image'
import { Inter } from 'next/font/google'
import Topbar from '@/components/Topbar/Topbar'
import ProblemTable from '@/components/ProblemTable/ProblemTable'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='w-full h-screen bg-dark-layer-2'>
      <Topbar/>
      <h1 className='text-2xl font-medium uppercase text-gray-700 dark:text-gray-200 mt-10 mb-5 text-center'>
        &Idquo; Quality Over Quantity &Idquo;
      </h1>
      <div className='mx-auto relative overflow-x-hidden'>
      <table className='max-w-[1200px] mx-auto sm:w-11/12 text-sm text-left text-gray-500 dark:text-gray-400 '>
        <thead className='text-xs text-gray-700 dark:text-gray-400 border-b uppercase'>
          <tr>
            <th scope='col' className='w-0 px-1 py-3 font-medium'>
              Status
            </th>
            <th scope='col' className='w-0 px-6 py-3 font-medium'>
              Title
            </th>
            <th scope='col' className='w-0 px-6 py-3 font-medium'>
              Difficulty
            </th>
            <th scope='col' className='w-0 px-6 py-3 font-medium'>
              Category
            </th>
            <th scope='col' className='w-0 px-6 py-3 font-medium'>
              Solution
            </th>
          </tr>
        </thead>
        <ProblemTable/>
      </table>
      </div>

    </div>
  )
}
