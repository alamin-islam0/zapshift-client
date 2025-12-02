import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div>
            <h2 className='text-green-600 text-4xl text-center'>Payment Cancelled</h2>
            <Link className='btn btn-accent' to={"/dashboard/my-parcels"}>Try Again</Link>
        </div>
    );
};

export default PaymentCancelled;