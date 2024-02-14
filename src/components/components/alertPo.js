// import React, { useEffect } from 'react';
import React from 'react';
import { Alert } from 'react-bootstrap';

function AlertPo() {
    // // Define the delay function
    // const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // // Asynchronous operation (e.g., fetching data, making API calls, etc.)
    // const fetchData = async () => {
    //     await delay(1000); // Replace this with your actual asynchronous operation
    //     // Additional logic after the delay
    // };

    // // useEffect to mimic component did mount
    // useEffect(() => {
    //     fetchData();
    // }, []); // Empty dependency array to run the effect only once on mount

    return (
        // JSX for your component
        <>
            <Alert variant="success" className='text-center'>
                <Alert.Heading>Pengumuman!</Alert.Heading>
                <p className='mt-3 mb-0'>OPEN PO Album A Batch 1 dibuka tanggal 10-21 Januari 2024.</p>
            </Alert>
        </>
    );
}

export default AlertPo;