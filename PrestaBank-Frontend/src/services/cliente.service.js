import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/v1/cliente/');
}

const create = data => {
    return httpClient.post("/api/v1/cliente/", data);
}

const update = data => {
    return httpClient.put('/api/v1/cliente/', data);
}

const get = id => {
    return httpClient.get(`/api/v1/cliente/${id}`);
}

const getRut = rut => {
    return httpClient.get(`/api/v1/cliente/rut/${rut}`);
}

export default { getAll, create, get, update, getRut};