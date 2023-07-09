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

export async function sentOttp(){
  try {
    const resp=await axios.post('/student/sentOtp',{
      headers:{"Content-Type":"application/json"},withCredentials:true
    })
    if(resp.data.success){
      return resp.data.otpToken
    }else{
      Swal.fire({
        icon: "error",
        title: "Oops..!!",
        text: "An error occurred while fetching student data",
      });
     
    }
    console.log(resp.data,'dfdfdfdfdf')
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops..!!",
      text: "An error occurred while fetching student data",
    });
    throw error;
  }
}
