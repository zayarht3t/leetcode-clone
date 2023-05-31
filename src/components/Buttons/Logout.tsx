import React from 'react';
import {FiLogOut} from 'react-icons/fi'
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';




const Logout:React.FC = () => {
    const [signOut, loading, error] = useSignOut(auth);
    const handleLogout = async () => {
    await signOut()
}
    return <button className='py-1.5 px-3 rounded bg-dark-layer-1 text-brand-orange' onClick={handleLogout}>
        <FiLogOut size={20}/>
    </button>
}
export default Logout;