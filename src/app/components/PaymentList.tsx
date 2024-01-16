"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Payment {
    id: number;
    Name: string;
    "Payment Schedule": string;
    "Bill Number": string;
    "Amount Paid": string;
    "Balance amount": string;
    Date: string;
}

const PaymentList: React.FC = () => {
    const [payments, setPayments] = useState<Payment[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/payment');
                const data: Payment[] = response.data;
                setPayments(data);
            } catch (error) {
                if (error instanceof Error) {
                    console.error('Error fetching payments:', error.message);
                } else {
                    console.error('An unknown error occurred:', error);
                }
            }
        };

        fetchData();
    }, []);


    return (
        <div>
            <div className='flex items-center gap-4 rounded-md h-[52px] text-mainTitle text-xs font-semibold p-4'>
                <div className='flex-1'>Name</div>
                <div className='flex-1'>Payment Schedule</div>
                <div className='flex-1'>Bill Number</div>
                <div className='flex-1'>Amount Paid</div>
                <div className='flex-1'>Balance amount</div>
                <div className='flex-1'>Date</div>
            </div>
            {payments.map((payment, index) => (
                <ul key={payment.id} className={`flex items-center gap-4  ${index % 2 === 0 ? 'bg-white' : ''} text-sm font-normal rounded-md h-[51px] p-4 `}>
                    <li className='flex-1'>{payment.Name}</li>
                    <li className='flex-1'>{payment["Payment Schedule"]}</li>
                    <li className='flex-1'>{payment["Bill Number"]}</li>
                    <li className='flex-1'>{payment["Amount Paid"]}</li>
                    <li className='flex-1'>{payment["Balance amount"]}</li>
                    <li className='flex-1'>{payment.Date}</li>
                </ul>
            ))}
        </div>
    );
};

export default PaymentList;
