import httpClient from "../http-common";

const create = (data) => {
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    return httpClient.post("/api/v1/cliente/nuevo-documento", data, { headers });
};

const update = (data) => {
    const headers = {
        "Content-Type": "multipart/form-data",
        };
    return httpClient.post("/api/v1/cliente/actualiza-documento", data, { headers });
};

const getByRut = (rut) => {
    return httpClient.get(`/api/v1/cliente/documentacion/${rut}`,{
    });
};
export default { create, update, getByRut };