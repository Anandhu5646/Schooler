import axios from "axios";
import Swal from "sweetalert";

export async function fetchFacultyList() {
  try {
    const response = await axios.get("/faculty/", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    console.log(response.data);
    if (response.data.error) {
      Swal.fire({
        icon: "error",
        title: "Oops..!!",
        text: response.data.message,
      });
      return [];
    } else {
      return response.data.faculty;
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
