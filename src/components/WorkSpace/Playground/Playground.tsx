import React from 'react';
import PreferenceNav from './PreferenceNav/PreferenceNav';
import Split from 'react-split'
import CodeMirror from '@uiw/react-codemirror'
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import EditFooter from './EditFooter';
import { Problem } from '../../../../utils/Types/problem';
type PlaygroundProps = {
    problem: Problem
};

const Playground:React.FC<PlaygroundProps> = ({problem}) => {
    const [activeTest, setActiveTest] = React.useState(0);

    const boilerplate = `function twoSum(nums, target) {
        //write your code here
    }`
    
    return (
        <div className=' bg-dark-layer-1 w-full flex flex-col overflow-x-hidden relative'>
            <PreferenceNav/>
        <Split
            className=" h-[calc(100vh-94px)]"
            direction="vertical"
            sizes={[60,40]}
            minSize={60}
            
        >
            <div className='w-full overflow-auto'>
                <CodeMirror
                    value={problem?.starterCode}
                    theme={vscodeDark}
                    extensions={[javascript()]}
                    style={{fontSize: 20}}
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
        <EditFooter/>
        </div>
        
    )
}
export default Playground;