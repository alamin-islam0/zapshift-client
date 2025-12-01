import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loader from '../../../components/spinner/LoadingSpinner';

const Payment = () => {

    const {parcelId} = useParams();
    const axiosSecure = useAxiosSecure();

    const {isLoading, data: parcel} = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    })

     if( isLoading ) {
        return <div className='flex justify-center items-center'><Loader/></div>
    }

    return (
        <div>
            <h2>{parcel.parcelName}</h2>
        </div>
    );
};

export default Payment;