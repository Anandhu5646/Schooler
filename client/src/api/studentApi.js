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



const StudentProfileUpdateApi = async (name, email, mobile, dob, admYear, fatherName, motherName, address, rollNo, gender, age, pic) => {
  try {
    const response = await axios.post('/student/', {
      name,
      email,
      mobile,
      dob,
      admYear,
      fatherName,
      motherName,
      address,
      rollNo,
      gender,
      age,
      pic
    });

    // Handle the response or perform any additional logic

    return response.data; // Return the response data if needed
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('Error updating student profile:', error);
    throw error; // Rethrow the error or handle it gracefully
  }
};

export default StudentProfileUpdateApi;
