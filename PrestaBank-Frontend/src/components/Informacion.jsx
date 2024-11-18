import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import clienteService from "../services/cliente.service";
import creditoService from "../services/credito.service";
import  Container from "@mui/material/Container";
import  Divider from "@mui/material/Divider";
import  Typography from "@mui/material/Typography";

import TextField from "@mui/material/TextField";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TableContainer from "@mui/material/TableContainer";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import documentacionService from "../services/documentacion.service";

const Informacion = () => {
    const [cliente, setCliente] = useState({});
    const [credito, setCredito] = useState({});
    const [error, setError] = useState(null);
    
    const {id} = useParams();


    useEffect(() => {
        creditoService.getCreditoId(id)
        .then(response => {
            const rutObtenido = response.data.rut;
            setCredito(response.data);
            console.log(response.data);
            return clienteService.getRut(rutObtenido);
        })
        .then(response => {
            setCliente(response.data);
        })
        .catch(error => {
            console.error('Error al obtener información:', error);
            setError('No se pudo obtener la información del cliente.');
        });
    }, [id]);

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    const mostrarBooleano = (valor) => {
        return valor ? "Sí" : "No";
    };

    const formatearNombre = (nombre) => {
        switch (nombre) {
          case "PRIMERAVIVIENDA":
            return "Primera Vivienda";
          case "SEGUNDAVIVIENDA":
            return "Segunda Vivienda";
          case "COMERCIAL":
            return "Propiedad Comercial";
          case "REMODELACION":
            return "Proyecto de Remodelación";
          default:
            return nombre;
        }
    };


    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2} sx={{ fontWeight: 'bold', fontSize: '1.2rem'}}>
                            Información del Cliente:
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell><strong>Nombre:</strong></TableCell>
                        <TableCell>{cliente.nombre}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>Apellidos:</strong></TableCell>
                        <TableCell>{cliente.apellidos}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>Edad:</strong></TableCell>
                        <TableCell>{cliente.edad}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>RUT:</strong></TableCell>
                        <TableCell>{cliente.rut}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>Ingresos mensuales en Pesos Chilenos ($):</strong></TableCell>
                        <TableCell>{cliente.ingresos?.toFixed(2)||"0.00"}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>Tiene morosidades o deudas pendientes:</strong></TableCell>
                        <TableCell>{mostrarBooleano(cliente.esMoroso)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>Trabaja de forma independiente:</strong></TableCell>
                        <TableCell>{mostrarBooleano(cliente.esIndependiente)}</TableCell>
                    </TableRow>
                    {cliente.esIndependiente ? (
                        <TableRow>
                            <TableCell>Teniendo en cuenta los ingresos de los últimos años, ¿es estable?</TableCell>
                            <TableCell>{mostrarBooleano(cliente.esEstable)}</TableCell>
                        </TableRow>
                    ) : (
                        <TableRow>
                            <TableCell><strong>Antigüedad en el empleo actual (años):</strong></TableCell>
                            <TableCell>{cliente.antiguedadLaboral}</TableCell>
                        </TableRow>
                    )}
                    <TableRow>
                        <TableCell><strong>Suma de todas las deudas en Pesos Chilenos ($):</strong></TableCell>
                        <TableCell>{cliente.deudaTotal?.toFixed(2)||"0.00"}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>Saldo en la Cuenta de Ahorros ($):</strong></TableCell>
                        <TableCell>{cliente.saldo?.toFixed(2)||"0.00"}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>Mayor Retiro en los últimos 6 meses ($):</strong></TableCell>
                        <TableCell>{cliente.mayorRetiro6?.toFixed(2)||"0.00"}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>¿Realiza depósitos en la cuenta mensual o trimestralmente?:</strong></TableCell>
                        <TableCell>{mostrarBooleano(cliente.depositoRegular)}</TableCell>
                    </TableRow>
                    {cliente.depositoRegular ? (
                        <TableRow>
                            <TableCell><strong>Suma de depósitos realizados durante el último año ($):</strong></TableCell>
                            <TableCell>{cliente.totalDepositos?.toFixed(2)||"0.00"}</TableCell>
                        </TableRow>
                    ):null}
                    <TableRow>
                        <TableCell><strong>En los últimos 12 meses, saldo positivo en la cuenta, sin retiros significativos:</strong></TableCell>
                        <TableCell>{mostrarBooleano(cliente.saldoPositivo)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>Mayor Retiro en los ultimos 12 meses:</strong></TableCell>
                        <TableCell>{(cliente.mayorRetiro12?.toFixed(2)||"0.00")}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>Antigüedad de la cuenta de ahorros, en años:</strong></TableCell>
                        <TableCell>{cliente.tiempoCuentaAhorros}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <br></br>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2} sx={{ fontWeight: 'bold', fontSize: '1.2rem'}}>
                            Información del Crédito solicitado:
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell><strong>Tipo de Préstamo:</strong></TableCell>
                        <TableCell>{formatearNombre(credito.tipoPrestamo)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>Valor de la propiedad:</strong></TableCell>
                        <TableCell>{(credito.valorPropiedad?.toFixed(2)||"0.00")}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>Monto:</strong></TableCell>
                        <TableCell>{(credito.monto?.toFixed(2)||"0.00")}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>Plazo, en años:</strong></TableCell>
                        <TableCell>{credito.plazo}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>Tasa de interés:</strong></TableCell>
                        <TableCell>{credito.tasaInteres}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <br></br>
            <Link to="/ejecutivos/inicio">Volver a la lista general de solicitudes</Link>
            <br></br>
        </TableContainer>
        
    );
    
};
export default Informacion;