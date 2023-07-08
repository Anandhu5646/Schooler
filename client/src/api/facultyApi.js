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
     
      Swal.fire({
        icon: "success",
        title: "Faculty Bio",
        text: response.data.message,
        timer: 1000
      });
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
