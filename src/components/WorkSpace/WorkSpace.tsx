import React, { useState } from 'react';
import Split from 'react-split'
import ProblemDescription from './ProblemDescription/ProblemDescription';
import Playground from './Playground/Playground';
import { Problem } from '../../../utils/Types/problem';
import Confetti from 'react-confetti';
import useWindowSize from '../../../hooks/useWindowSize';

type WorkSpaceProps = {
    problem: Problem
};

const WorkSpace:React.FC<WorkSpaceProps> = ({problem}) => {
    const {width,height} = useWindowSize();
    const [success,setSuccess] = useState(false);
    const [solved,setSolved] = useState(false);
    
    return (
        <Split className='split relative' minSize={0}>
            <ProblemDescription problem={problem} _solved={solved}/>
            <div className=' bg-dark-fill-2'>
                <Playground problem={problem} setSuccess={setSuccess} setSolved={setSolved}/>
                {
                    success &&
                    (
                        <Confetti width={width} height={height} tweenDuration={4000} gravity={0.3}/>                        
                    )
                }

            </div>

        </Split>            

    )
}
export default WorkSpace;