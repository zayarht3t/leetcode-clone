import React, { useEffect, useState } from 'react';
import PreferenceNav from './PreferenceNav/PreferenceNav';
import Split from 'react-split'
import CodeMirror from '@uiw/react-codemirror'
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import EditFooter from './EditFooter';
import { Problem } from '../../../../utils/Types/problem';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firebase } from '@/firebase/firebase';
import { toast } from 'react-toastify';
import { problems } from '../../../../utils/Problems';
import { useRouter } from 'next/router';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import useLocalStorage from '../../../../hooks/useLocalStorage';
type PlaygroundProps = {
    problem: Problem,
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
    setSolved: React.Dispatch<React.SetStateAction<boolean>>
};

export interface ISettings {
	fontSize: string;
	settingsModalIsOpen: boolean;
	dropdownIsOpen: boolean;
}

const Playground:React.FC<PlaygroundProps> = ({problem,setSuccess,setSolved}) => {
    const [activeTest, setActiveTest] = React.useState(0);
    const [user] = useAuthState(auth);
    let [userCode,setUserCode] = useState<string>(problem.starterCode);
    const router = useRouter();
    const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");
    const {pid} = router.query;
    const [settings, setSettings] = useState<ISettings>({
		fontSize: fontSize,
		settingsModalIsOpen: false,
		dropdownIsOpen: false,
	});

    const boilerplate = `function twoSum(nums, target) {
        //write your code here
    }`

    useEffect(() => {
        userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName))
        const code = localStorage.getItem(`code-${pid}`);
        if(user){
            setUserCode(code ? JSON.parse(code) : problem.starterCode);
        }else {
            setUserCode(problem.starterCode);
        }
    }, [pid,userCode,problem,setUserCode,]);


	const onChange = (value: string) => {
		setUserCode(value);
        localStorage.setItem(`code-${pid}`,JSON.stringify(value));
	};

    const handlerSuccess = async () => {
        if(!user){
             toast.error("You must be logged in to play this problem",{position: "top-center", autoClose: 5000,theme: 'dark'})
            return;
    }

    try {
        const cb = new Function(`return ${userCode}`)();
        const handler = problems[pid as string].handlerFunction;
        if(typeof handler === "function"){
            const success = handler(cb);
        if(success){
            toast.success('Congrats! All tests passed',{position: "top-center", autoClose: 5000,theme: 'dark'})
        }
        setSuccess(true);

        setTimeout(() =>{
            setSuccess(false);
        },6000)

        const userRef = doc(firebase, 'users', user.uid);
        await updateDoc(userRef,{
            solvedProblems: arrayUnion(pid)
        })
        setSolved(true);
        }
        
    } catch (error) {
        toast.error("Oops! one or more tests failed",{position: "top-center", autoClose: 5000});
    }
        

    }
    
    return (
        <div className=' bg-dark-layer-1 w-full flex flex-col overflow-x-hidden relative'>
            <PreferenceNav settings={settings} setSettings={setSettings}/>
        <Split
            className=" h-[calc(100vh-94px)]"
            direction="vertical"
            sizes={[55,45]}
            minSize={60}
            
        >
            <div className='w-full overflow-auto'>
                <CodeMirror
                    value={userCode}
                    theme={vscodeDark}
                    onChange={onChange}
                    extensions={[javascript()]}
                    style={{fontSize: settings.fontSize}}
                />
            </div>
            <div className='w-full px-5 overflow-auto'>
                <div className='flex items-center space-x-6 h-10'>
                    <div className='relative h-full items-center cursor-pointer flex flex-col'>
                        <div className='text-sm font-medium leading-5 text-white mt-2'>Testcases</div>
                        <hr className='w-16 h-0.5 border-none bg-white absolute bottom-0' />
                    </div>
                </div>

                <div className="flex">
                {
                    problem && (
                        problem.examples.map((example, index) => (
                        <div className={'mr-2 mt-2  items-start'+ ( activeTest === index ? ' text-white' : ' text-gray-400')} onClick={()=>setActiveTest(index)} key={index}>
                            <div className='flex flex-wrap items-center gap-y-4'>
                                <div className='font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap'>
                                    Case {index + 1}
                                </div>
                            </div>
                        </div>                            
                        )
                        )
                    )
                }
                </div>
                {
                    problem.examples && (
                    <div className=' font-semibold my-4'>
                        <p className='text-sm font-medium text-white'>Input:</p>
                        <div className="py-[10px] text-white mt-2 px-3 w-full bg-dark-fill-3 border-transparent rounded-lg">
                            {problem.examples[activeTest].inputText}
                        </div>
                        <p className='text-sm font-medium text-white mt-4'>Output:</p>
                        <div className="py-[10px] text-white mt-2 px-3 w-full bg-dark-fill-3 border-transparent rounded-lg">
                            {problem.examples[activeTest].outputText}
                        </div>
                    </div>                        
                    )
                }

            </div>
            
        </Split>
        <EditFooter handlerSuccess={handlerSuccess}/>
        </div>
        
    )
}
export default Playground;