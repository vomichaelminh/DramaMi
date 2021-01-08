import axios from "axios";

const dramaUrl = "http://localhost:5000/dramas";
const userUrl = "http://localhost:5000/users";

export const fetchDramas = () => axios.get(dramaUrl);
export const createDrama = (newDrama) => axios.post(dramaUrl, newDrama);
export const deleteDrama = (id) => axios.delete(`${dramaUrl}/${id}`);
