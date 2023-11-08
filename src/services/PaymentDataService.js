import http from "../../http-common";

class PaymentDataService {
  getAll() {
    return http.get("/payments");
  }

  get(id) {
    return http.get(`/payments/${id}`);
  }

  create(data) {
    return http.post("/payments", data);
  }

  update(id, data) {
    return http.put(`/payments/${id}`, data);
  }

  delete(id) {
    return http.delete(`/payments/${id}`);
  }

}

export default new PaymentDataService();