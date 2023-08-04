import React from 'react';
import pic from '../assets/404page.gif';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const ErrPage = () => {
  let navigate=useNavigate()
  return (
    <div
      style={{
       backgroundColor:'rgb(156 222 239)',
        backgroundImage: `url(${pic})`,
        backgroundSize: 'auto',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        
        height: '100vh',
      }}
    ><div style={{display:'flex',justifyContent:'center',alignItems:'center',paddingTop:'300px',fontSize:'1000'}}>

      <Button style={{textDecoration:'underline',fontWeight:'bold',letterSpacing:'2px'}} onClick={()=>navigate('/')}>Go Home</Button>
    </div>
    </div>
  );
};

export default ErrPage;