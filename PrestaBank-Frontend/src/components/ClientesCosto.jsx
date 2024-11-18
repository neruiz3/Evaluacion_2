import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import creditoService from "../services/credito.service";
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
import TableContainer from "@mui/material/TableContainer";

const ClientesCosto = () => {
    const [costo, setCosto] = useState({});
    const { id } = useParams();
    const [credito, setCredito] = useState({});


    const navigate = useNavigate();

    useEffect(() => {
        creditoService.getCreditoId(id)
        .then(response => {
            setCredito(response.data);
            console.log(response.data);
            return creditoService.costoTotal(response.data);
        })
        .then(response => {
            setCosto(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error al obtener información:', error);
        });
    }, [id]);

    
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
        <Table size="small">
            <TableHead>
                <TableRow sx={{ backgroundColor: '#1976d2' }}>
                    <TableCell 
                        colSpan={2} 
                        sx={{ 
                            fontWeight: 'bold', 
                            fontSize: '1.3rem', 
                            color: 'white', 
                            textAlign: 'center', 
                            padding: '10px 0'
                        }}
                    >
                        Información sobre costos
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {[
                    { label: 'Cuota mensual del préstamo:', value: costo.cuotaMensual },
                    { label: 'Seguro de desgravamen:', value: costo.seguroDesgravamen },
                    { label: 'Seguro de incendio:', value: costo.seguroIncendio },
                    { label: 'Comisión por administración:', value: costo.comisionAdmin },
                    { label: 'Costo mensual del préstamo:', value: costo.costoMensual },
                    { label: 'COSTO TOTAL:', value: costo.costoTotal },
                ].map((row, index) => (
                    <TableRow 
                        key={index} 
                        sx={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white' }}
                    >
                        <TableCell sx={{ fontWeight: 'bold', padding: '8px' }}>
                            {row.label}
                        </TableCell>
                        <TableCell sx={{ padding: '8px' }}>
                            {row.value?.toFixed(2) || '0.00'}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <div style={{ margin: '20px', textAlign: 'center' }}>
            <Link to={`/clientes/solicita-credito/${credito.rut}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                Volver a mi lista de créditos
            </Link>
        </div>
    </TableContainer>
    );
};
export default ClientesCosto;