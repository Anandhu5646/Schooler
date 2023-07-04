import axios from "axios";
import Swal from "sweetalert2";

export async function fetchStudentList() {
  try {
    const response = await axios.get("/admin/viewStudents", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    if (response.data.success) {
      return response.data.students;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.message,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    Swal.fire({
      icon: "error",
      title: "Oops..!!",
      text: "An error occurred while fetching student data.",
    });
    throw error;
  }
}

export async function addStudent(studentData) {
  try {
    const response = await axios.post("/admin/addStudent", studentData);
    if (response.data.success) {
      return response.data.student;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops..!!",
        text: response.data.error,
      });
      throw new Error(response.data.error);
    }
  } catch (error) {
    console.error("Error:", error);
    Swal.fire({
      icon: "error",
      title: "Oops..!!",
      text: "An error occurred while saving student data.",
    });
    throw error;
  }
}
export async function editStudents(id, updatedData) {
  try {
    const response = await axios.put(`/admin/editStudent/${id}`, updatedData);
    console.log("Student data updated.", response.data);
  } catch (error) {
    console.error("Error:", error);
    Swal.fire({
      icon: "error",
      title: "Oops..!!",
      text: "An error occurred while editing student data.",
    });
    throw error;
  }
}

export async function fetchFacultyList() {
  try {
    const response = await axios.get("/admin/viewFaculties", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    console.log(response.data);
    if (response.data.success) {
      return response.data.faculties;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops..!!",
        text: response.message,
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops..!!",
      text: "An error occured while fetching faculty data",
    });
    throw error;
  }
}

export async function addFaculty(facultyData) {
  try {
    const response = await axios.post("/admin/addFaculty", facultyData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    if (response.data.success) {
      return response.data.faculty;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops..!!",
        text: response.data.error,
      });
      throw new Error(response.data.error);
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops..!!",
      text: "An error occured while saving faculty data",
    });
    throw error;
  }
}

export async function fetchClubList() {
  try {
    const response = await axios.get("/admin/viewClubs", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    if (response.data.success) {
      return response.data.clubs;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops..!!",
        text: response.message,
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops..!!",
      text: "An error occured while fetching club data",
    });
    throw error;
  }
}

export async function addClub(clubData) {
  try {
    const response = await axios.post("/admin/addClub", clubData);
    if (response.data.success) {
      return response.data.club;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops..!!",
        text: response.data.error,
      });
      throw new Error(response.data.error);
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops..!!",
      text: "An error occured while saving club data",
    });
    throw error;
  }
}

export async function fetchClassList() {
  try {
    const response = await axios.get("/admin/viewClasses", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    if (response.data.success) {
      return response.data.classes;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops..!!",
        text: response.message,
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops..!!",
      text: "An error occured while fetching class data",
    });
    throw error;
  }
}

export async function addClass(classData) {
  try {
    const response = await axios.post("/admin/addClass", classData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    if (response.data.success) {
      return response.data.classNam;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops..!!",
        text: response.data.error,
      });
      throw new Error(response.data.error);
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops..!!",
      text: "An error occured while saving class data",
    });
    throw error;
  }
}
export async function deleteFac(id) {
  try {
    const response = await axios.post(
      "/admin/deleteFaculty",
      { id },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    if (response.data.success) {
      Swal.fire({
        icon: "success",
        title: "Confirmation!!",
        text: response.message,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops..!!",
        text: "An error occurred while deleting faculty",
      });
    }
  } catch (error) {
    console.error(error);
  }
}
