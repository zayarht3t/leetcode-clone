import Topbar from '@/components/Topbar/Topbar';
import WorkSpace from '@/components/WorkSpace/WorkSpace';
import React from 'react';

type ProblemPageProps = {
    
};

const ProblemPage:React.FC<ProblemPageProps> = () => {
    
    return (
        <>
            <Topbar problemPage={true}/>
            <WorkSpace/>
        </>
        
    )
}
export default ProblemPage;