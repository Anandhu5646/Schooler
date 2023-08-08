import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export async function authAdmin() {
  const response = await axios.get("/admin/auth");
  return response;
}

export async function fetchStudentList(search, currentPage) {
  try {
    const response = await axios.get(
      "/admin/viewStudents",
      { params: { search, currentPage } },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    if (response.data.success) {
      console.log(response.data, "++++++++++++++++++");
      return response.data;
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

export async function fetchFacultyList(search, currentPage) {
  try {
    const response = await axios.get(
      "/admin/viewFaculties",
      { params: { search, currentPage } },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    if (response.data.success) {
      return response.data;
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

export async function fetchClubList(search, currentPage) {
  try {
    const response = await axios.get(
      "/admin/viewClubs",
      { params: { search, currentPage } },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    if (response.data.success) {
      return response.data;
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
    const { facultyId, facultyName, name, description } = clubData;
    const response = await axios.post("/admin/addClub", {
      facultyId,
      facultyName,
      name,
      description,
    });

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
      text: "An error occurred while saving club data",
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
    const response = await axios.delete(`/admin/deleteFaculty/${id}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    if (response.data.success) {
    
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
export async function deleteClub(id) {
  try {
    const response = await axios.post(`/admin/deleteClub/${id}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    if (response.data.success) {
      Swal.fire({
        icon: "success",
        title: "Confirmation!!",
        text: response.data.message,
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
export async function deleteStudent(id) {
  try {
    const response = await axios.post(
      "/admin/deleteStudent",
      { id },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    if (response.data.success) {
     console.log('deleted')
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
export async function deleteSubjects(id) {
  try {
    const response = await axios.post(
      "/admin/deleteSubject",
      { id },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    if (response.data.success) {
     
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops..!!",
        text: "An error occurred while deleting faculty",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateFaculty(id) {
  try {
    let response = await axios.get(
      "/admin/updateFaculty",
      { params: { id } },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    if (response.data.success) {
      return response.data.faculty;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error occured while getting faculty details",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops..!!",
      text: "Something went wrong",
    });
    throw error;
  }
}
export async function saveUpdateFaculty(
  id,
  name,
  email,
  mobile,
  address,
  age,
  dob,
  joiningYear,
  gender,
  qualification,
  teachingArea,
  className
) {
  try {
    let response = await axios.post(
      "/admin/updateFaculty",
      {
        id,
        name,
        email,
        mobile,
        address,
        dob,
        joiningYear,
        gender,
        qualification,
        teachingArea,
        className,
        age,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (response.data.success) {
      console.log(response.data, "-------------------------");
      return response.data;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error while updating faculty details",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops..!!",
      text: "Something went wrong",
    });
    throw error;
  }
}

export const getStudentClubFac = async () => {
  try {
    const response = await axios.get(`/admin/faculty`);

    return response.data;
  } catch (err) {
    console.error("Error:", err);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong",
    });
    return null;
  }
};

export async function getComplaints(search,currentPage) {
  try {
    const response = await axios.get("/admin/complain" ,{params:{search, currentPage}});
    if (response.data.success) {
      return response.data;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops..!!",
        text: "An error occurred while fetching complaints..!",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong",
    });
    return null;
  }
}

export async function deleteComplain(id) {
  try {
    const response = await axios.post(
      `/admin/deleteComplain/${id}`,

      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    if (response.data.success) {
  
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops..!!",
        text: "An error occurred while deleting faculty",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops..!!",
      text: "Something went wrong",
    });
    throw error;
  }
}
export async function updateStudent(id) {
  try {
    let response = await axios.get(
      "/admin/updateStudent",
      { params: { id } },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    if (response.data.success) {
      return response.data.student;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error occured while getting student details",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops..!!",
      text: "Something went wrong",
    });
    throw error;
  }
}
export async function saveUpdateStudent(
  id,
  name,
  email,
  mobile,
  address,
  age,
  dob,
  admYear,
  rollNo,
  gender,
  fatherName,
  motherName,
  className
) {
  try {
    let response = await axios.post(
      "/admin/updateStudent",
      {
        id,
        name,
        email,
        mobile,
        address,
        dob,
        admYear,
        rollNo,
        gender,
        fatherName,
        motherName,
        className,
        age,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data.success) {
      return response.data;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error while updating student details",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops..!!",
      text: "Something went wrong",
    });
    throw error;
  }
}

export async function savePayment(paymentData) {
  try {
    const response = await axios.post(
      "/admin/addPayment",
      { paymentData },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (response.data.success) {
      return response.data;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error while saving payment message",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops..!!",
      text: "Something went wrong",
    });
    throw error;
  }
}
export async function getPayment(search,currentPage) {
  try {
    const response = await axios.get(
      "/admin/payment",
      { params: { search,currentPage } },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (response.data.success) {
      return response.data;
    }
  } catch (error) {}
}
export async function deletePayment(id) {
  try {
    const response = await axios.post(`/admin/deletePayment/${id}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
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
export async function getPayHistory() {
  try {
    const response = await axios.get("/admin/paymentHistory", {
      headers: { "Content-Type": "application/json", withCredentials: true },
    });
    if (response.data.success) {
      console.log(response.data.history, "eeeeeeeeeeeeeeeeeeee");
      return response.data.history;
    } else {
      Swal.fire({
        icon: "error",
        text: "Failed to fetch payment history",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      text: "Failed to fetch payment history",
    });
    throw error;
  }
}
export async function fetchNoticeList(search, currentPage) {
  try {
    const response = await axios.get(
      "/admin/notice",
      { params: { search, currentPage } },
      {
        headers: { "Content-Type": "application/json", withCredentials: true },
      }
    );
    if (response.data.success) {
      return response.data;
    } else {
      Swal.fire({
        icon: "error",
        text: "Failed to fetch notices",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      text: "Failed to fetch notices",
    });
    throw error;
  }
}
export async function  deleNotice(id) {
  try {
    const response = await axios.post(
      `/admin/deleteNotice/${id}`,
      {
        headers: { "Content-Type": "application/json", withCredentials: true },
      }
    );
    if (response.data.success) {
      return response.data;
    } else {
      Swal.fire({
        icon: "error",
        text: "Failed to fetch notices",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      text: "Failed to fetch notices",
    });
    throw error;
  }
}
export async function  delClass(id) {
  try {
    const response = await axios.post(
      `/admin/deleteClass/${id}`,
      {
        headers: { "Content-Type": "application/json", withCredentials: true },
      }
    );
    if (response.data.success) {
      return response.data;
    } else {
      Swal.fire({
        icon: "error",
        text: "Failed to fetch notices",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      text: "Failed to fetch notices",
    });
    throw error;
  }
}