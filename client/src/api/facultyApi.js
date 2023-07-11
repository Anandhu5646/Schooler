import axios from "axios";
import Swal from "sweetalert2";
import Toaster from "../components/toaster/Toaster";

export async function fetchFaculty() {
  try {
    const response = await axios.get(`/faculty/`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
   
    if (response.data.success) {
     
      // Swal.fire({
      //   icon: "success",
      //   title: "Faculty Bio",
      //   text: response.data.message,
      //   timer: 1000
      // });
      return response.data.faculty
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops..!!",
        text: response.data.message,
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops..!!",
      text: "An error occurred while fetching faculty data",
    });
    throw error;
  }
}


export async function sentOttpFac(emailOrPhone) {
  try {
    const response = await axios.post('/faculty/sentOtp', { email: emailOrPhone });

  
    return response.data
    
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops..!!',
      text: 'An error occurred while sending OTP',
    });
    throw error;
  }
}

export async function facultySubmitPass(newPassword){
  try {
    const response = await axios.post('/faculty/changePass', {
      newPassword
    }, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    console.log(response.data,'dfdfdfd')
      return response.data
  
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops..!!',
      text: 'An error occurred while updating password',
    });
    throw error;
  }
}