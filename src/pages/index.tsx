import { Inter } from 'next/font/google'
import Topbar from '@/components/Topbar/Topbar'
import ProblemTable from '@/components/ProblemTable/ProblemTable'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/firebase'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import { firebase } from '@/firebase/firebase'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [user,error,loading] = useAuthState(auth);
  const [problemPage,setProblemPage] = useState(true);
  const router = useRouter();

  const [input,setInput] = useState({
    id: '',
    title: '',
    difficulty: '',
    category: '',
    videoId: '',
    link: '',
    order: 0,
    likes: 0,
    dislikes: 0,
  })
  useEffect(()=>{
    if(!user){
        router.push('/auth');
    }
},[user,router])

// const handleInput = (e: React.ChangeEvent<HTMLInputElement>)=>{
//   e.preventDefault();
//   setInput({...input,[e.target.name]:e.target.value})
// }

// const handleSubmit =async (e: React.ChangeEvent<HTMLFormElement>)=>{
//   e.preventDefault();
//   const newDocument = {
//     ...input,
//     order: Number(input.order) 
//   }
//   await setDoc(doc(firebase, "problems",input.id), {
//     newDocument
//   });
//   alert("Successfully added problem");
// }
  return (
    <div className='w-full h-screen bg-dark-layer-2'>
      <Topbar problemPage={true}/>
      <h1 className='text-2xl font-medium uppercase text-gray-400 dark:text-gray-200 mt-10 mb-5 text-center'>
        " Quality Over Quantity "
      </h1>
      {problemPage && (
						<div className='max-w-[1200px] mx-auto sm:w-7/12 w-full flex animate-pulse'>
              <div className='mx-auto'>
                {[...Array(10)].map((_, idx) => (
                  <LoadingSkeleton key={idx} />
                ))}                
              </div>

						</div>
					)}
            <div className='mx-auto relative overflow-x-hidden'>
            <table className='max-w-[1200px] mx-auto sm:w-11/12 text-sm text-left text-gray-400 dark:text-gray-400 '>
              <thead className='text-xs text-gray-400 dark:text-gray-400 border-b uppercase'>
                <tr>
                  <th scope='col' className='w-0 px-1 py-4 font-medium'>
                    Status
                  </th>
                  <th scope='col' className='w-0 px-6 py-4 font-medium'>
                    Title
                  </th>
                  <th scope='col' className='w-0 px-6 py-4 font-medium'>
                    Difficulty
                  </th>
                  <th scope='col' className='w-0 px-6 py-4 font-medium'>
                    Category
                  </th>
                  <th scope='col' className='w-0 px-6 py-4 font-medium'>
                    Solution
                  </th>
                </tr>
              </thead>
              <ProblemTable setLoadingProblem={setProblemPage}/>
            </table>
          </div>
          

      {/* <form action="" className='mt-6 p-6 flex flex-col gap-4' onSubmit={handleSubmit}>
        <input onChange={handleInput} type="text" placeholder='problem id' name='id' />
        <input onChange={handleInput} type="text" placeholder='title' name='title' />
        <input onChange={handleInput} type="text" placeholder='difficulty' name='difficulty' />
        <input onChange={handleInput} type="text" placeholder='category' name='category' />
        <input onChange={handleInput} type="number" placeholder='order' name='order' />
        <input onChange={handleInput} type="text" placeholder='videoId?' name='videoId' />
        <input onChange={handleInput} type="text" placeholder='link?' name='link' />
        <button>submit</button>
      </form> */}
    </div>
  )
}

const LoadingSkeleton = () => {
	return (
		<div className='flex items-center space-x-12 mt-4 px-6 py-2'>
			<div className='w-6 h-6 shrink-0 rounded-full bg-dark-layer-1'></div>
			<div className='h-4 sm:w-52  w-32  rounded-full bg-dark-layer-1'></div>
			<div className='h-4 sm:w-52  w-32 rounded-full bg-dark-layer-1'></div>
			<div className='h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1'></div>
			<span className='sr-only'>Loading...</span>
		</div>
	);
};