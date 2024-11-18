import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import creditoService from "../services/credito.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import Container from '@mui/material/Container';
import MenuItem from "@mui/material/MenuItem";

const NuevoCredito = () => {
    const [monto, setMonto] = useState(0);
    const [plazo, setPlazo] = useState(0);
    const [tasaInteres, setTasaInteres] = useState(0.0);
    const [tipoPrestamo, setTipoPrestamo] = useState(""); // Enum as string
    const [valorPropiedad, setValorPropiedad] = useState(0);
    const [tiposPrestamo, setTiposPrestamo] = useState([]);
    const [selectedTipo, setSelectedTipo] = useState("");
    const navigate = useNavigate();
    const { rut } = useParams();
    const { id } = useParams();

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

    const guardaCredito = (e) => {
        e.preventDefault();

        const credito = {rut, plazo, tasaInteres, monto, tipoPrestamo, valorPropiedad, id};
        console.log(rut);
        creditoService
            .create(credito)
            .then((response) => {
                console.log("Se ha añadido un nuevo credito.", response.data);
                navigate(`/clientes/solicita-credito/${rut}`);
            })
            .catch((error) => {
                console.log(
                "Ha ocurrido un error al intentar crear nuevo cliente.",
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
        setTipoPrestamo(event.target.value);
        console.log(selectedTipo);
    };

  return (
    <Container maxWidth="sm">
          <Box sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom>
              Solicitud de crédito
            </Typography>
            <form onSubmit={guardaCredito}>
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
                    label="Valor de la propiedad"
                    type="number"
                    value={valorPropiedad}
                    onChange={(e) => setValorPropiedad(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    select
                    label="Tipo de Préstamo"
                    value={tipoPrestamo}
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
                    Solicitar
                </Button>
            </form>
            <br></br>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Tipo de Préstamo</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Tasa de Interés mímima</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Tasa de Interés máxima</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Monto Máximo</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Plazo Máximo</th>
                    </tr>
                </thead>
                <tbody>
                    {tiposPrestamo.map((prestamo, index) => (
                    <tr key={index}>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{formatearNombre(prestamo.nombre)}</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{prestamo.tasaInteresMinima}%</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{prestamo.tasaInteresMaxima}%</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{prestamo.montoMaximo}% del valor de la propiedad</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{prestamo.plazoMaximo} años</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        <Link to={`/clientes/solicita-credito/${rut}`}> Volver a mi lista de créditos</Link>
        </Box>
    </Container>
    );
};
export default NuevoCredito;