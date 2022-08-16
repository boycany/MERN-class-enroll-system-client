import axios from "axios";

const API_URL = "http://localhost:8080/api/courses";

function getToken() {
  let token;
  if (localStorage.getItem("user")) {
    token = JSON.parse(localStorage.getItem("user")).token;
  } else {
    token = "";
  }

  return token;
}

const headers = {
  headers: {
    Authorization: getToken(),
  },
};

class CourseService {
  post(title, description, price) {
    return axios.post(API_URL, { title, description, price }, headers);
  }

  getEnrolledCourses(_id) {
    return axios.get(API_URL + "/student/" + _id, headers);
  }

  getCourseByName(name) {
    return axios.get(API_URL + "/findByName/" + name, headers);
  }

  get(_id) {
    return axios.get(API_URL + "/instructor/" + _id, headers);
  }

  enroll(_id, student_id){
    return axios.post(API_URL + "/enroll/" + _id, { student_id: student_id }, headers)
  }
}

export default new CourseService();
