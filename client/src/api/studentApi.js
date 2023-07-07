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