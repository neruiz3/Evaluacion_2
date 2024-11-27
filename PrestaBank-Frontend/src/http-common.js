import axios from "axios";

const Evaluacion1BackendServer = "127.0.0.1";
const Evaluacion1BackendPort = "30397";

console.log(Evaluacion1BackendServer)
console.log(Evaluacion1BackendPort)

export default axios.create({
    baseURL: `http://${Evaluacion1BackendServer}:${Evaluacion1BackendPort}`,
    headers: {
        'Content-Type': 'application/json'
    }
});