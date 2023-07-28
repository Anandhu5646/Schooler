import axios from "axios";
import Swal from "sweetalert2";

export async function fetchFaculty() {
  try {
    const response = await axios.get(`/faculty/`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
   
    if (response.data.success) {
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


export async function fetchStudentsByclass() {
  try {
    const response = await axios.get("/faculty/viewAttendance", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    if (response.data.success) {
      return response.data.studentArr;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops..!!",
        text: response.data.error
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops..!!",
      text: "An error occurred while fetching data",
    });
    throw error;
  }
}
export async function saveAttendanceData(attendanceData) {
  try {
    const response = await axios.post('/faculty/viewAttendance', {attendanceData}, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });

    if (response.data.success) {
      console.log(response.data,'Attendance data saved successfully');
      return response.data
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops..!!",
        text: "Failed to save attendance data",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops..!!",
      text: "An error occurred while saving attendance data:",
    });
    throw error;
  }
}

export async function getStudentByClass(){
  try {
    const response = await axios.get("/faculty/viewMarkStatus", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    if (response.data.success) {
      return response.data.students;
      
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops..!!",
        text: "Something went wrong while fetching data",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops..!!",
      text: "An error occurred while saving attendance data:",
    });
    throw error;
  }
}

export async function getAllSubj(){
  try {
    const response= await axios.get("/faculty/viewSubjects",
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
    )

    if(response.data.success){
      return response.data.subjects
    }else {
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
      text: "An error occurred while fetching subjects",
    });
    throw error;
  }
}

export async function saveMarkData(studentId, subjectId,subjectName, marks, grade) {
  try {
    const response = await axios.post("/faculty/saveMark", {
      studentId: studentId,
      subjectId: subjectId,
      subjectName:subjectName,
      marks: marks,
      grade: grade
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops..!!",
      text: "An error occurred while uploading marks",
    });
    throw error;
  } 
}

export async function getStudClubReq(){
  try {
    const response= await axios.get("/faculty/viewClubReq",{
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    if(response.data.success){
      return response.data.request
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops..!!",
      text: "An error occurred while fetching student club requests",
    });
    throw error;
  }
}

export async function FacClubReqUpdated(id,status){
  try {
    const response=await axios.post(`/faculty/saveReq`,{id,status},
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    
   if(response.data.success){
      return response.data
    }else{
      return response.error
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops..!!",
      text: "An error occurred while updating status",
    });
    throw error;
  }
}
export async function saveFacultyComplain(title, content){
  try {
    const response= await axios.post("/faculty/saveComplaint",{title, content}
    ,{
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    if(response.data.success){
      console.log(response.data,'dfdddfdddddddddddddddd');
      return response.data
    }else{
      return response.error
    } 
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops..!!",
      text: "An error occurred while registering complain",
    });
    throw error;
  }
}