import axios from "axios";

const Evaluacion1BackendServer = '104.41.37.114';
const Evaluacion1BackendPort = import.meta.env.VITE_EVALUACION1_BACKEND_PORT;

console.log(Evaluacion1BackendServer)
console.log(Evaluacion1BackendPort)

export default axios.create({
    baseURL: `http://${Evaluacion1BackendServer}:${Evaluacion1BackendPort}`,
    headers: {
        'Content-Type': 'application/json'
    }
});