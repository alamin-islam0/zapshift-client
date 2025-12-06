import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Forbidden from '../components/forbidden/Forbidden';

const AdminRoutes = ({children}) => {

    const {user, loading} = useAuth();
    const {role, roleLoading} = useRole();

    if(loading || roleLoading) {
        return <div className='flex justify-center items-center'><Loader/></div>
    }

    if(role !== 'admin') {
        return <Forbidden/>
    }

    return children;
};

export default AdminRoutes;