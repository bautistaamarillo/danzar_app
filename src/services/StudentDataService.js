import http from "../../http-common";

class StudentDataService {
  getAll() {
    return http.get("/students");
  }

  get(id) {
    return http.get(`/students/${id}`);
  }

  edit(id) {
    return http.get(`/students/${id}/edit`)
  }

  create(data) {
    return http.post("/students", data);
  }

  update(id, data) {
    return http.put(`/students/${id}`, data);
  }

  delete(id) {
    return http.delete(`/students/${id}`);
  }
}

export default new StudentDataService();