import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';
import Loader from '../components/spinner/LoadingSpinner';

const PrivateRoute = ({children}) => {

    const {user, loading} = useAuth();

    if( loading) {
        return <div><Loader/></div>
    }

    if(!user) {
        return <Navigate to={'/login'}></Navigate>
    }

    return children;
};

export default PrivateRoute;