import Topbar from '@/components/Topbar/Topbar';
import WorkSpace from '@/components/WorkSpace/WorkSpace';
import React from 'react';
import { problems } from '../../../utils/Problems';
import { Problem } from '../../../utils/Types/problem';
import useHasMounted from '../../../hooks/useHasMounted';

type ProblemPageProps = {
    problem: Problem
    
};

const ProblemPage:React.FC<ProblemPageProps> = ({problem}) => {

    const hasMounted = useHasMounted();
    if(!hasMounted) return null;
    return (
        <>
            <Topbar problemPage={true}/>
            <WorkSpace problem={problem}/>
        </>
        
    )
}
export default ProblemPage;

export async function getStaticPaths() {
    const paths = Object.keys(problems).map((key) => ({
        params: {pid: key}
    }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}: {params: {pid:string}}) {
    const {pid} = params;
    const problem = problems[pid];
    
    if (!problem) {
        return {
            notFound: true
        }
    }

    problem.handlerFunction = problem.handlerFunction.toString();

    return {
        props: {
          problem
        }
        
    }

}