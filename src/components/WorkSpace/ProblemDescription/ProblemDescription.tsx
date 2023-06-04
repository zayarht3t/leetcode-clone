import React, { useEffect, useState } from 'react';
import {BsCheckCircle} from 'react-icons/bs'
import {AiFillLike,AiFillDislike,AiFillStar,AiOutlineLike,AiOutlineDislike,AiOutlineStar, AiOutlineLoading3Quarters} from 'react-icons/ai'
import { DBProblem, Problem } from '../../../../utils/Types/problem';
import { arrayRemove, arrayUnion, doc, getDoc, runTransaction, updateDoc } from 'firebase/firestore';
import { auth, firebase } from '@/firebase/firebase';
import RectangleSkeleton from '@/components/Skeletons/RectangleSkeleton';
import CircleSkeleton from '@/components/Skeletons/CircleSkeleton';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { problems } from '../../../../utils/Problems';

type ProblemDescriptionProps = {
    problem: Problem,
	_solved: boolean,
};

const ProblemDescription:React.FC<ProblemDescriptionProps> = ({problem,_solved}) => {

    const {currentProblem,loading,difficultyClass,setCurrentProblem} =  useGetProblems(problem.id)
    const {liked,disliked,setData,solved,starred} = useGetUsersDataOnProblem(problem.id);
    const [user] = useAuthState(auth);
    const [updating,setUpdating] = useState(false);
	const solvedProblems = useGetSolvedProblems();


    const returnUserDataAndProblemData = async (transaction: any) => {
		const userRef = doc(firebase, "users", user!.uid);
		const problemRef = doc(firebase, "problems", problem.id);
		const userDoc = await transaction.get(userRef);
		const problemDoc = await transaction.get(problemRef);
        console.log(problemDoc.data().likes);
		return { userDoc, problemDoc, userRef, problemRef };
	};

	const handleLike = async () => {
		if (!user) {
			toast.error("You must be logged in to like a problem", { position: "top-left", theme: "dark" });
			return;
		}
		if (updating) return;
		setUpdating(true);
		await runTransaction(firebase, async (transaction) => {
			const { problemDoc, userDoc, problemRef, userRef } = await returnUserDataAndProblemData(transaction);

			if (userDoc.exists() && problemDoc.exists()) {
				if (liked) {
					// remove problem id from likedProblems on user document, decrement likes on problem document
					transaction.update(userRef, {
						likedProblems: userDoc.data().likedProblems.filter((id: string) => id !== problem.id),
					});
					transaction.update(problemRef, {
						likes: problemDoc.data().likes - 1,
					});

					setCurrentProblem((prev) => (prev ? { ...prev, likes: prev.likes - 1 } : null));
					setData((prev) => ({ ...prev, liked: false }));
				} else if (disliked) {
					transaction.update(userRef, {
						likedProblems: [...userDoc.data().likedProblems, problem.id],
						dislikedProblems: userDoc.data().dislikedProblems.filter((id: string) => id !== problem.id),
					});
					transaction.update(problemRef, {
						likes: problemDoc.data().likes + 1,
						dislikes: problemDoc.data().dislikes - 1,
					});

					setCurrentProblem((prev) =>
						prev ? { ...prev, likes: prev.likes + 1, dislikes: prev.dislikes - 1 } : null
					);
					setData((prev) => ({ ...prev, liked: true, disliked: false }));
				} else {
					transaction.update(userRef, {
						likedProblems: [...userDoc.data().likedProblems, problem.id],
					});
					transaction.update(problemRef, {
						likes: problemDoc.data().likes + 1,
					});
					setCurrentProblem((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null));
					setData((prev) => ({ ...prev, liked: true }));
				}
			}
		});
		setUpdating(false);
	};

    const handleDislike = async () => {
		if (!user) {
			toast.error("You must be logged in to like a problem", { position: "top-left", theme: "dark" });
			return;
		}
        
        if (updating) return;
		setUpdating(true);
		await runTransaction(firebase, async (transaction) => {
			const { problemDoc, userDoc, problemRef, userRef } = await returnUserDataAndProblemData(transaction);
			if (userDoc.exists() && problemDoc.exists()) {
				// already disliked, already liked, not disliked or liked
				if (disliked) {
					transaction.update(userRef, {
						dislikedProblems: userDoc.data().dislikedProblems.filter((id: string) => id !== problem.id),
					});
					transaction.update(problemRef, {
						dislikes: problemDoc.data().dislikes - 1,
					});
					setCurrentProblem((prev) => (prev ? { ...prev, dislikes: prev.dislikes - 1 } : null));
					setData((prev) => ({ ...prev, disliked: false }));
				} else if (liked) {
					transaction.update(userRef, {
						dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
						likedProblems: userDoc.data().likedProblems.filter((id: string) => id !== problem.id),
					});
					transaction.update(problemRef, {
						dislikes: problemDoc.data().dislikes + 1,
						likes: problemDoc.data().likes - 1,
					});
					setCurrentProblem((prev) =>
						prev ? { ...prev, dislikes: prev.dislikes + 1, likes: prev.likes - 1 } : null
					);
					setData((prev) => ({ ...prev, disliked: true, liked: false }));
				} else {
					transaction.update(userRef, {
						dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
					});
					transaction.update(problemRef, {
						dislikes: problemDoc.data().dislikes + 1,
					});
					setCurrentProblem((prev) => (prev ? { ...prev, dislikes: prev.dislikes + 1 } : null));
					setData((prev) => ({ ...prev, disliked: true }));
				}
			}
		});
		setUpdating(false);
    }

	const handleStar = async () => {
		if (!user) {
			toast.error("You must be logged in to star a problem", { position: "top-left", theme: "dark" });
			return;
		}
		if (updating) return;
		setUpdating(true);

		if (!starred) {
			const userRef = doc(firebase, "users", user.uid);
			await updateDoc(userRef, {
				staredproblems: arrayUnion(problem.id),
			});
			setData((prev) => ({ ...prev, starred: true }));
		} else {
			const userRef = doc(firebase, "users", user.uid);
			await updateDoc(userRef, {
				staredproblems: arrayRemove(problem.id),
			});
			setData((prev) => ({ ...prev, starred: false }));
		}

		setUpdating(false);
	};
    
    return <div className='h-[100vh] bg-dark-layer-1 overflow-y-auto'>
        <div className='bg-dark-layer-2 h-12 rounded-t-md p-2'>
            <p className='text-white text-md p-2 border-t-gray-100 bg-dark-layer-1 w-fit rounded-t-md'>Description</p>
            <div className='mt-4 p-2  flex flex-col gap-4'>
                <h2 className='text-white font-bold text-2xl'>{problem?.title}</h2>
                {
                    !loading && currentProblem && (
                        <div className='flex gap-10 items-center cursor-pointer'>
                        <div className={'py-1.5 px-3 opacity-70 rounded-[21px] ' + (difficultyClass)}>
                            <p className=' opacity-100 text-white'>{currentProblem?.difficulty}</p>
                        </div>
						{
							solved && _solved || solvedProblems.includes(problem.id) && (
                        		<BsCheckCircle size={25} className='text-olive'/>								
							)
						}

                        <div className='flex gap-1 items-center' onClick={handleLike}>
                            {
                                liked && !updating && 
                                <AiFillLike size={28} className=' text-dark-blue-s' />
                            }
                            {
                                !liked && !updating &&  <AiOutlineLike size={28} className='text-gray-400' />
                            }
                            {
                                updating &&  <AiOutlineLoading3Quarters size={28} className=' animate-spin'/>
                            }

                            <p className='text-gray-400'>{currentProblem?.likes}</p>
                        </div>
                        <div className='flex gap-1 items-center' onClick={handleDislike}>
                            {
                                disliked && !updating && <AiFillDislike size={28} className=' text-dark-blue-s'/>
                            }
                            {
                                !disliked && !updating && <AiOutlineDislike size={28} className='text-gray-400'/>
                            }
                                                        {
                                updating &&  <AiOutlineLoading3Quarters size={28} className=' animate-spin'/>
                            }
                            <p className='text-gray-400'>{currentProblem?.dislikes}</p>
                        </div>
                        <div className='flex items-center' onClick={handleStar}>
                            {
                                starred && <AiFillStar size={28} className=' text-dark-yellow'/>
                            }
                            {
                                !starred && <AiOutlineStar size={28} className='text-gray-400'/>
                            }
                        </div>
                    </div>
                    )
                }

{loading && (
							<div className='mt-3 flex space-x-2'>
								<RectangleSkeleton />
								<CircleSkeleton />
								<RectangleSkeleton />
								<RectangleSkeleton />
								<CircleSkeleton />
							</div>
						)}

                <div className='flex flex-col gap-4 w-11/12'>
                    <div
                    dangerouslySetInnerHTML={{__html: problem?.problemStatement}}
                    />
                </div>
                {
                    problem?.examples.map((example, index) => (
                        <div className='w-full' key={index}>

                            <div className=' my-4 flex flex-col w-5/6 mx-2 '>
                                <h1 className='font-bold text-xl my-3 text-white'>Example {index+1}:</h1>
                                {
                                    example?.img && (
                                        <img src={example?.img} alt="" className='w-full max-h-[300px]' />
                                    )
                                }
                                <div className=' bg-dark-fill-3 p-3 rounded-md flex items-start pl-4 flex-col gap-2'>
                                    <p>
                                        <span className='text-white font-bold text-lg'>Input: </span>
                                        <span className='text-lg text-dark-gray-7'>{example?.inputText}</span>
                                    </p>
                                    <p>
                                        <span className='text-white font-bold text-lg'>Output: </span>
                                        <span className='text-lg text-dark-gray-7'> {example?.outputText}</span>
                                    </p>
                                    {
                                        example?.explanation &&
                                        (
                                        <p>
                                            <span className='text-white font-bold text-lg'>Explanation: </span>
                                            <span className='text-lg text-dark-gray-7'>{example?.explanation}</span>
                                        </p>
                                        )
                                    }

                                </div>
                            </div>
                            
                        </div>                        
                    ))
                }


            <div className=' pl-4 pr-4 pb-4 ml-2'>
                <div
                dangerouslySetInnerHTML={{__html: problem?.constraints}}/>
            </div>

        </div>
             
            
        </div>
    </div>
}
export default ProblemDescription;

 function useGetProblems(id: string) {
    const [loading,setLoading] = useState<boolean>(false);
    const [currentProblem, setCurrentProblem] = useState<DBProblem | null>(null);
    const [difficultyClass,setDifficultyClass] = useState<string>('');

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const docRef = doc(firebase,'problems',id);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()) {
                setCurrentProblem({...docSnap.data().newDocument} as DBProblem);
                setDifficultyClass(
					docSnap.data().newDocument.difficulty === "Easy"
						? "bg-olive text-olive"
						: docSnap.data().newDocument.difficulty === "Medium"
						? "bg-dark-yellow text-dark-yellow"
						: " bg-dark-pink text-dark-pink"
				);
                
            }
            setLoading(false);
        }

        getData();
    },[id])

    return {currentProblem,loading,difficultyClass,setCurrentProblem}
}

function useGetUsersDataOnProblem(problemId: string) {
    const [data,setData] = useState({liked: false, disliked: false, starred: false,solved: false});
    const [user] = useAuthState(auth);

    useEffect(() => {
        const getUserDataOnProblem = async () => {
            const userRef = doc(firebase,'users',user!.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
				const data = userSnap.data();
				const { solvedProblems, likedProblems, dislikedProblems, staredproblems } = data;
				setData({
					liked: likedProblems.includes(problemId), // likedProblems["two-sum","jump-game"]
					disliked: dislikedProblems.includes(problemId),
					starred: staredproblems.includes(problemId),
					solved: solvedProblems.includes(problemId),
				});
			}

        }

		if (user) getUserDataOnProblem();
		return () => setData({ liked: false, disliked: false, starred: false, solved: false });
    },[problemId,user])

    return {...data,setData}
}

function useGetSolvedProblems() {
	const [solvedProblems, setSolvedProblems] = useState<string[]>([]);
	const [user] = useAuthState(auth);

	useEffect(() => {
		const getSolvedProblems = async () => {
			const userRef = doc(firebase, "users", user!.uid);
			const userDoc = await getDoc(userRef);

			if (userDoc.exists()) {
				setSolvedProblems(userDoc.data().solvedProblems);
			}
		};

		if (user) getSolvedProblems();
		if (!user) setSolvedProblems([]);
	}, [user]);

	return solvedProblems;
}