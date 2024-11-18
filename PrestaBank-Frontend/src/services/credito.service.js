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

const simularCredito = (data) => {
    return httpClient.post("/api/v1/credito/calculaSimulacion", data);
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

const actualizarEstado = (id, estado) => {
    return httpClient.put(`/api/v1/credito/${id}`, estado); 
}

const revisionInicial = (data) => {
    return httpClient.put('/api/v1/credito/revisaInicial', data);
}

const evaluar = (data) => {
    return httpClient.put('/api/v1/credito/evaluar', data);
}

const costoTotal = (data) => {
    return httpClient.post('/api/v1/credito/costoTotal', data);
}

export default {
    getCreditos,
    getCreditosRut,
    getCreditoId,
    simularCredito,
    getTiposPrestamos,
    create,
    remove,
    actualizarEstado,
    revisionInicial,
    evaluar,
    costoTotal,
};