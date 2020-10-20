import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("http://localhost:8000/api/login", { credentials }).then(res => res.data),
    register: user =>
      axios.post("/api/user", { user }).then(res => res.data.data),
    },
  events: {
    fetchAll: () => axios.get("http://localhost:8000/api/event").then(res => res.data.data.events),
    create: event =>
      axios.post("http://localhost:8000/api/event", { event }).then(res => res.data.data.event)
  }
};