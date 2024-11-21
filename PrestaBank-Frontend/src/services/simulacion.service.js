import httpClient from "../http-common";

const simularCredito = (data) => {
    return httpClient.post('/api/v1/simulacion-credito/calculaSimulacion', data);
}
export default {
    simularCredito
};