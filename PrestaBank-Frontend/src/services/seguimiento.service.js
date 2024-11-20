import httpClient from "../http-common";

const getCreditosRut = rut => {
    return httpClient.get(`/api/v1/seguimiento/cliente/${rut}`);
}

const create = (data) => {
    return httpClient.post("/api/v1/seguimiento/", data);
}

const remove = (id) => {
    return httpClient.delete(`/api/v1/seguimiento/${id}`);
}

const actualizarEstado = (id, estado) => {
    return httpClient.put(`/api/v1/seguimiento/${id}`, estado); 
}

export default {
    getCreditosRut,
    create,
    remove,
    actualizarEstado
};