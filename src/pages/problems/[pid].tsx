import Topbar from '@/components/Topbar/Topbar';
import React from 'react';

type ProblemPageProps = {
    
};

const ProblemPage:React.FC<ProblemPageProps> = () => {
    
    return (
        <Topbar problemPage={true}/>
    )
}
export default ProblemPage;