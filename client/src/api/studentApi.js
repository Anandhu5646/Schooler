import axios from "axios";
import Swal from "sweetalert2";

export async function fetchStudent() {
  try {
    const response = await axios.get(`/student/`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    if (response.data.success) {
      return response.data.student;
    } else {
      throw new Error("Student not found");
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops..!!",
      text: "An error occurred while fetching student data",
    });
    throw error;
  }
}

export async function sentOttp(emailOrPhone) {
  try {
    const response = await axios.post('/student/sentOtp', { email: emailOrPhone });

  
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

export async function studentSubmitPass(newPassword){
  try {
    const response = await axios.post('/student/changePass', {
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

export async function getClub(){
  try {
    const response= await axios.get('/student/clubs', {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    if(response.data.success){
      console.log(response.data,'clubs')
      return response.data
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops..!!',
      text: 'An error occurred while fetching clubs',
    });
    throw error;
  }
}


export async function facultyClubReqSend(studentName, studentId, className, clubId, clubName, facultyName, facultyId) {
  try {
    const response = await axios.post('/student/clubReq', {
      studentName,
      className,
      clubName,
      status: 'Request Send',
      facultyId,
      facultyName,
      studentId,
      clubId,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    if (response.data === false) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something Wrong',
      });
    } else {
      Swal.fire({
        icon: 'success',
        text: response.data,
      });
    }
    console.log(response.data, 'data');
    return response.data;
  } catch (error) {
    // Handle error here
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    });
    throw error;
  }
}

export async function studClubStatus(){
  try {
    const response= await axios.get("/student/clubStatus",
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
    )
    if(response.data.success){
      console.log(response.data,'dfdfdfdfdffdfdf')
      return response.data.statuss
    }
  } catch (error) {
    
  }
}

