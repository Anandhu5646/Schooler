import axios from "axios";
import Swal from "sweetalert2";

export async function fetchFaculty(id) {
  try {
    const response = await axios.get(`/faculty/${id}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    console.log(response.data);
    if (response.data.success) {
      Swal.fire({
        icon: "success",
        title: "Faculty Bio",
        text: response.data.message,
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
