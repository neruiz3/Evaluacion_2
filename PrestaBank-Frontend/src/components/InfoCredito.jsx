import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import clienteService from "../services/cliente.service";
import creditoService from "../services/evaluacion.service";
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

const InfoCredito = () => {
    const [cliente, setCliente] = useState({});
    const [credito, setCredito] = useState({});
    const [error, setError] = useState(null);
    const [documentacion, setDocumentacion] = useState({
        comprobanteIngresos: null,
        historialCrediticio: null,
        certificadoAntiguedadLaboral: null,
        informeDeudas: null,
        fotocopiaRut: null,
        cuentaAhorros: null
      });
    
    const {id} = useParams();
    
    const navigate = useNavigate();

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
            setDocumentacion({
                comprobanteIngresos: response.data.comprobanteIngresos ? `data:application/pdf;base64,${response.data.comprobanteIngresos}` : null,
                historialCrediticio: response.data.historialCrediticio ? `data:application/pdf;base64,${response.data.historialCrediticio}` : null,
                certificadoAntiguedadLaboral: response.data.certificadoAntiguedadLaboral ? `data:application/pdf;base64,${response.data.certificadoAntiguedadLaboral}` : null,
                informeDeudas: response.data.informeDeudas ? `data:application/pdf;base64,${response.data.informeDeudas}` : null,
                fotocopiaRut: response.data.fotocopiaRut ? `data:application/pdf;base64,${response.data.fotocopiaRut}` : null,
                cuentaAhorros: response.data.cuentaAhorros ? `data:application/pdf;base64,${response.data.cuentaAhorros}` : null,
              });
            console.log(response.data)
        })
        .catch(error => {
            console.error('Error al obtener información:', error);
            setError('No se pudo obtener la información del cliente.');
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name);
        
        setCliente({ ...cliente, [name]: value });
    };

    const handleRadioChange = (name, value) => {
        setCliente({ ...cliente, [name]: value === 'true' });
    };

    const guardarCambios = (e) => {
        e.preventDefault();

        clienteService
        .update(cliente)
        .then((response) => {
          console.log("Cliente actualizado.", response.data);
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al actualizar el cliente.",
            error
          );
        });
    };


    const renderPdfViewer = (label, base64Data) => {
        if (!base64Data) {
            return (
                <TableRow>
                    <TableCell>{label}:</TableCell>
                    <TableCell>
                        <Typography color="textSecondary">No disponible</Typography>
                    </TableCell>
                </TableRow>
            );
        }

        return (
            <TableRow>
                <TableCell>{label}:</TableCell>
                <TableCell>
                    <iframe
                        src={base64Data}
                        width="100%"
                        height="500px"
                        style={{ border: "none" }}
                        title={label}
                    />
                </TableCell>
            </TableRow>
        );
    };

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }



    const evaluaCredito = (e) => {
        e.preventDefault();
        console.log(credito);
        creditoService
        .evaluar(credito)
        .then((response) => {
          console.log("Credito evaluado.", response.data);
          navigate("/ejecutivos/inicio");
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al evaluar el cliente.",
            error
          );
        });
    };

    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2} sx={{ fontWeight: 'bold', fontSize: '1.2rem'}}>
                            Información del Cliente
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
                        <TableCell><strong>RUT:</strong></TableCell>
                        <TableCell>{cliente.rut}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Ingresos mensuales en Pesos Chilenos:</TableCell>
                        <TableCell>
                            <TextField 
                                type="number"
                                name="ingresos"
                                value={cliente.ingresos}
                                onChange={handleChange}
                                size="small"
                                fullWidth
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Tiene morosidades o deudas pendientes:</TableCell>
                        <TableCell>
                            <RadioGroup 
                                row 
                                value={String(cliente.esMoroso)} 
                                onChange={(e) => handleRadioChange('esMoroso', e.target.value)}
                            >
                                <FormControlLabel value="true" control={<Radio />} label="Sí" />
                                <FormControlLabel value="false" control={<Radio />} label="No" />
                            </RadioGroup>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Trabaja de forma independiente:</TableCell>
                        <TableCell>
                            <RadioGroup 
                                row 
                                value={String(cliente.esIndependiente)} 
                                onChange={(e) => handleRadioChange('esIndependiente', e.target.value)}
                            >
                                <FormControlLabel value="true" control={<Radio />} label="Sí" />
                                <FormControlLabel value="false" control={<Radio />} label="No" />
                            </RadioGroup>
                        </TableCell>
                    </TableRow>
                    {cliente.esIndependiente ? (
                        <TableRow>
                            <TableCell>Teniendo en cuenta los ingresos de los últimos años, ¿es estable?</TableCell>
                            <TableCell>
                                <RadioGroup 
                                    row 
                                    value={String(cliente.esEstable)} 
                                    onChange={(e) => handleRadioChange('esEstable', e.target.value)}
                                >
                                    <FormControlLabel value="true" control={<Radio />} label="Sí" />
                                    <FormControlLabel value="false" control={<Radio />} label="No" />
                                </RadioGroup>
                            </TableCell>
                        </TableRow>
                    ) : (
                        <TableRow>
                            <TableCell>Antigüedad en el empleo actual (años):</TableCell>
                            <TableCell>
                                <TextField 
                                    type="number" 
                                    name="antiguedadLaboral" 
                                    value={cliente.antiguedadLaboral} 
                                    onChange={handleChange} 
                                    size="small" 
                                    fullWidth 
                                />
                            </TableCell>
                        </TableRow>
                    )}
                    <TableRow>
                        <TableCell>Suma de todas las deudas en Pesos Chilenos</TableCell>
                        <TableCell>
                            <TextField 
                                type="number" 
                                name="deudaTotal" 
                                value={cliente.deudaTotal} 
                                onChange={handleChange} 
                                size="small" 
                                fullWidth 
                                />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Saldo en la Cuenta de Ahorros:</TableCell>
                        <TableCell>
                            <TextField 
                                type="number" 
                                name="saldo" 
                                value={cliente.saldo} 
                                onChange={handleChange} 
                                size="small" 
                                fullWidth 
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Mayor Retiro en los últimos 6 meses:</TableCell>
                        <TableCell>
                            <TextField 
                                type="number" 
                                name="mayorRetiro6" 
                                value={cliente.mayorRetiro6} 
                                onChange={handleChange} 
                                size="small" 
                                fullWidth 
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Suma de depósitos realizados durante el último año en Pesos Chilenos:</TableCell>
                        <TableCell>
                            <TextField
                                name="totalDepositos"
                                type="number"
                                value={cliente.totalDepositos}
                                onChange={handleChange}
                                size="small" 
                                fullWidth 
                        />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>En los últimos 12 meses, saldo positivo en la cuenta, sin retiros significativos:</TableCell>
                        <TableCell>
                            <RadioGroup 
                                row 
                                value={String(cliente.saldoPositivo)} 
                                onChange={(e) => handleRadioChange('saldoPositivo', e.target.value)}
                            >
                                <FormControlLabel value="true" control={<Radio />} label="Sí" />
                                <FormControlLabel value="false" control={<Radio />} label="No" />
                            </RadioGroup>
                        </TableCell>
                    </TableRow>
                    {cliente.saldoPositivo && (
                    <TableRow>
                        <TableCell>Mayor Retiro en los ultimos 12 meses:</TableCell>
                        <TableCell>
                            <TextField 
                                type="number" 
                                name="mayorRetiro12" 
                                value={cliente.mayorRetiro12} 
                                onChange={handleChange} 
                                size="small" 
                                fullWidth 
                            />
                        </TableCell>
                    </TableRow>
                    )}
                    <TableRow>
                        <TableCell>Antigüedad de la cuenta de ahorros, en años:</TableCell>
                        <TableCell>
                            <TextField
                                name="tiempoCuentaAhorros"
                                type="number"
                                value={cliente.tiempoCuentaAhorros}
                                onChange={handleChange}
                                size="small" 
                                fullWidth 
                        />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={guardarCambios} 
                sx={{ marginTop: '1rem' }}
            >
                Guardar Cambios
            </Button>
            <Container>
            <Divider sx={{ my: 2 }} />
                <Typography variant="h6" align="center" gutterBottom fontWeight='bold'>
                    Documentos para comprobar los datos del cliente:
                </Typography>
                <TableContainer component={Paper}>
                <Table size="small">
                    <TableBody>
                        {renderPdfViewer("Comprobante de Ingresos", documentacion.comprobanteIngresos)}
                        {renderPdfViewer("Historial Crediticio", documentacion.historialCrediticio)}
                        {renderPdfViewer("Certificado Antigüedad Laboral", documentacion.certificadoAntiguedadLaboral)}
                        {renderPdfViewer("Informe Deudas", documentacion.informeDeudas)}
                        {renderPdfViewer("Fotocopia RUT", documentacion.fotocopiaRut)}
                        {renderPdfViewer("Cuenta Ahorros", documentacion.cuentaAhorros)}
                    </TableBody>
                </Table>
            </TableContainer>
            </Container>
            <Button 
                variant="contained" 
                color="success" 
                onClick={evaluaCredito} 
                sx={{ marginTop: '1rem' }}
            >
                Evaluar Crédito
            </Button>
        </TableContainer>
        
    );
    
};

export default InfoCredito;
