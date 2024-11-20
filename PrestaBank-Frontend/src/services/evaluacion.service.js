import httpClient from "../http-common";

const getCreditos = () => {
    return httpClient.get('/api/v1/evaluacion/');
}

const getCreditoId = id => {
    return httpClient.get(`/api/v1/evaluacion/id/${id}`);
}

const getTiposPrestamos = () => {
    return httpClient.get('/api/v1/evaluacion/tipo-prestamo');
}

const create = (data) => {
    return httpClient.post("/api/v1/evaluacion/", data);
}

const remove = (id) => {
    return httpClient.delete(`/api/v1/evaluacion/${id}`);
}

const actualizarEstado = (id, estado) => {
    return httpClient.put(`/api/v1/evaluacion/${id}`, estado); 
}

const revisionInicial = (data) => {
    return httpClient.put('/api/v1/evaluacion/revisaInicial', data);
}

const evaluar = (data) => {
    return httpClient.put('/api/v1/evaluacion/evaluar', data);
}


export default {
    getCreditos,
    getCreditoId,
    getTiposPrestamos,
    create,
    remove,
    actualizarEstado,
    revisionInicial,
    evaluar
};