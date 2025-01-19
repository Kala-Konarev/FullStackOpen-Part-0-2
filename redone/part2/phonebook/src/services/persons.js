import axios from "axios";

const urlBase = "http://localhost:3001/persons";

const getAll = () => axios.get(urlBase).then((r) => r.data);

const create = (person) => axios.post(urlBase, person).then((r) => r.data);

const update = (id, person) =>
    axios.put(urlBase + `/${id}`, person).then((r) => r.data);

const remove = (id) => axios.delete(urlBase + `/${id}`).then((r) => r.data);
export default { getAll, update, create, remove };
