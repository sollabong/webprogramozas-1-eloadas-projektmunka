import axios from 'axios';

const API_URL =
  'https://webprog-beadando-gabor-lili.page.gd/server/api.php';

export const api = {
  getAllScientists: () => axios.get(`${API_URL}?type=scientists`),
  getScientist: (id) => axios.get(`${API_URL}?type=scientists&id=${id}`),
  createScientist: (data) => axios.post(`${API_URL}?type=scientists`, data),
  updateScientist: (data) => axios.put(`${API_URL}?type=scientists`, data),
  deleteScientist: (id) => axios.delete(`${API_URL}?type=scientists&id=${id}`),

  getAllEvents: () => axios.get(`${API_URL}?type=events`),
  getEvent: (id) => axios.get(`${API_URL}?type=events&id=${id}`),
  createEvent: (data) => axios.post(`${API_URL}?type=events`, data),
  updateEvent: (data) => axios.put(`${API_URL}?type=events`, data),
  deleteEvent: (id) => axios.delete(`${API_URL}?type=events&id=${id}`),

  assign: (tudosId, eloadasId) =>
    axios.post(`${API_URL}?type=assign`, { tudosId, eloadasId }),
  unassign: (tId, eId) =>
    axios.delete(`${API_URL}?type=assign&tId=${tId}&eId=${eId}`),
};
