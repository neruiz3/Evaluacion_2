import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import creditoService from "../services/simulacion.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";

const SimularCredito = () => {
    const [monto, setMonto] = useState("");
    const [plazo, setPlazo] = useState("");
    const [tasaInteres, setTasaInteres] = useState("");
    const [cuotaMensual, setCuotaMensual] = useState(null);


    const calcula = (e) => {
        e.preventDefault();

        const credito = { 
            monto: parseFloat(monto),
            plazo: parseInt(plazo),
            tasaInteres: parseFloat(tasaInteres),
        };

        console.log(credito);


        creditoService
            .simularCredito(credito)
            .then((response) => {
                
                console.log(response);
                setCuotaMensual(response.data.cuotaMensual);
            })
            .catch((error) => {
                console.log(
                "Ha ocurrido un error al intentar calcular la cuota mensual.",
                error
            );
        });   
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
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Calcular Cuota
                </Button>
            </form>
    
            {cuotaMensual !== null && (
              <Typography variant="h6" sx={{ mt: 3 }}>
                Cuota Mensual: ${cuotaMensual.toFixed(2)}
              </Typography>
            )}
            <Link to="/clientes/inicio">Volver a la lista de Clientes</Link>
          </Box>
        </Container>
      );
    };

    export default SimularCredito;
