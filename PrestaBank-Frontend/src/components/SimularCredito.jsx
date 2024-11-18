import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import creditoService from "../services/credito.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";

const SimularCredito = () => {
    const [monto, setMonto] = useState("");
    const [plazo, setPlazo] = useState("");
    const [tasaInteres, setTasaInteres] = useState("");
    const [tiposPrestamo, setTiposPrestamo] = useState([]);
    const [selectedTipo, setSelectedTipo] = useState("");
    const [cuotaMensual, setCuotaMensual] = useState(null);
    const [caracteristicasPrestamo, setCaracteristicasPrestamo] = useState(null);
    const [mostrarResultados, setMostrarResultados] = useState(false);
    const navigate = useNavigate();

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

    const calcula = (e) => {
        e.preventDefault();

        const credito = { 
            monto: parseFloat(monto),
            plazo: parseInt(plazo),
            tasaInteres: parseFloat(tasaInteres),
            tipoPrestamo : selectedTipo,
        };


        creditoService
            .simularCredito(credito)
            .then((response) => {
                
                console.log(response);
                setCuotaMensual(response.data.cuotaMensual);
                setMostrarResultados(true);
            })
            .catch((error) => {
                console.log(
                "Ha ocurrido un error al intentar calcular la cuota mensual.",
                error
            );
        });   
    };

    useEffect(() => {
        const fetchTiposPrestamo = async () => {
            try {
                const response = creditoService.getTiposPrestamos();
                console.log((await response).data);
                setTiposPrestamo((await response).data || []);
                
            } catch (error) {
                console.error("Error al obtener los tipos de préstamo", error);
            }
        };

        fetchTiposPrestamo();
    }, []);

    const handleTipoChange = (event) => {
        setSelectedTipo(event.target.value);
        console.log(selectedTipo);
        const tipoSeleccionado = tiposPrestamo.find(tipo => tipo.nombre === event.target.value);
        setCaracteristicasPrestamo(tipoSeleccionado);
        if(tipoSeleccionado){
            obtenerDocumentosRequeridos(caracteristicasPrestamo);
        }
    };

    const obtenerDocumentosRequeridos = (tipo) => {
        if (!tipo) return "No se requieren documentos";
        const documentos = [];
        if (tipo.comprobanteIngreso) documentos.push("Comprobante de Ingreso");
        if (tipo.certificadoAvaluo) documentos.push("Certificado de Avalúo");
        if (tipo.historialCrediticio) documentos.push("Historial Crediticio");
        if (tipo.escrituraVivienda) documentos.push("Escritura de Vivienda");
        if (tipo.estadoFinanciero) documentos.push("Estado Financiero");
        if (tipo.planNegocios) documentos.push("Plan de Negocios");
        if (tipo.presupuestoRemodelacion) documentos.push("Presupuesto de Remodelación");
        return documentos.length > 0 ? documentos.join(", ") : "No se requieren documentos"; // Valor predeterminado
    };

    return (
        <Container maxWidth="sm">
          <Box sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom>
              Simulador de Crédito Hipotecario
            </Typography>
            <form onSubmit={calcula}>
                <TextField
                    label="Monto"
                    type="number"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Plazo (años)"
                    type="number"
                    value={plazo}
                    onChange={(e) => setPlazo(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Tasa de interés (%)"
                    type="number"
                    value={tasaInteres}
                    onChange={(e) => setTasaInteres(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    select
                    label="Tipo de Préstamo"
                    value={selectedTipo}
                    onChange={handleTipoChange}
                    fullWidth
                    margin="normal"
                    required
                >
                    <MenuItem value="">-- Seleccionar --</MenuItem>
                    {tiposPrestamo.map((tipo) => (
                    <MenuItem key={tipo.nombre} value={tipo.nombre}>
                        {formatearNombre(tipo.nombre)}
                    </MenuItem>
                    ))}
                </TextField>
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Calcular Cuota
                </Button>
            </form>
    
            {cuotaMensual !== null && (
              <Typography variant="h6" sx={{ mt: 3 }}>
                Cuota Mensual: ${cuotaMensual.toFixed(2)}
              </Typography>
            )}

            {mostrarResultados && caracteristicasPrestamo && (
                    <Box sx={{ mt: 3, border: '1px solid gray', p: 2 }}>
                        <Typography variant="h6">Condiciones del Préstamo</Typography>
                        <table style={{ width: '100%', marginTop: '10px', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={{ border: '1px solid black', padding: '5px' }}>Plazo Máximo</th>
                                    <th style={{ border: '1px solid black', padding: '5px' }}>Tasa Interés Mínima</th>
                                    <th style={{ border: '1px solid black', padding: '5px' }}>Tasa Interés Máxima</th>
                                    <th style={{ border: '1px solid black', padding: '5px' }}>Porcentaje de Monto Máximo de Financiamiento</th>
                                    <th style={{ border: '1px solid black', padding: '5px' }}>Documentos Requeridos</th>                                 </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '5px' }}>{caracteristicasPrestamo.plazoMaximo} años</td>
                                    <td style={{ border: '1px solid black', padding: '5px' }}>{caracteristicasPrestamo.tasaInteresMinima}%</td>
                                    <td style={{ border: '1px solid black', padding: '5px' }}>{caracteristicasPrestamo.tasaInteresMaxima}%</td>
                                    <td style={{ border: '1px solid black', padding: '5px' }}>{caracteristicasPrestamo.montoMaximo}%</td>
                                    <td style={{ border: '1px solid black', padding: '5px' }}>{obtenerDocumentosRequeridos(caracteristicasPrestamo)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Box>
                )}
                <Link to="/clientes/inicio">Volver a la lista de Clientes</Link>
          </Box>
        </Container>
      );
    };

    export default SimularCredito;
