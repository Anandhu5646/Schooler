import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import pic from "../../assets/paysuccess.gif"


function PaymentSuccess() {

    const location = useLocation();
    const paymentId = new URLSearchParams(location.search).get('id');
   
    const navigate = useNavigate();
    setTimeout(() => {
        navigate('/student/payment')
    }, 5000)
    useEffect(() => {
      
        axios
          .get(`/paymentSuccess?id=${paymentId}`)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, [paymentId]);
  return (
    <div className="bg-white h-screen flex justify-center items-center">
      <div
        style={{
          backgroundColor: 'rgb(156, 222, 239)',
          backgroundImage: `url(${pic})`,
          backgroundSize: 'auto',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '100vh', // Adjust the height of the picture container as needed
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '20px',
        }}
      >
       
    </div>
    </div>
  )
}

export default PaymentSuccess