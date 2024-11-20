import httpClient from "../http-common";

const getCreditos = () => {
    return httpClient.get('/api/v1/credito/');
}

const getCreditosRut = rut => {
    return httpClient.get(`/api/v1/credito/cliente/${rut}`);
}

const getCreditoId = id => {
    return httpClient.get(`/api/v1/credito/id/${id}`);
}

const getTiposPrestamos = () => {
    return httpClient.get('/api/v1/credito/tipo-prestamo');
}

const create = (data) => {
    return httpClient.post("/api/v1/credito/", data);
}

const remove = (id) => {
    return httpClient.delete(`/api/v1/credito/${id}`);
}

const costoTotal = (data) => {
    return httpClient.post('/api/v1/credito/costoTotal', data);
}

export default {
    getCreditos,
    getCreditosRut,
    getCreditoId,
    getTiposPrestamos,
    create,
    remove,
    costoTotal,
};