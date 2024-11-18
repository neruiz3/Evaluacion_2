import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import clienteService from "../services/cliente.service";
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
import { Snackbar, Alert } from "@mui/material";

const NuevoCliente = () => {
  const [rut, setRut] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [edad, setEdad] = useState("");
  const [ingresos, setIngresos] = useState("");
  const [saldo, setSaldo] = useState("");
  const [saldoPositivo, setSaldoPositivo] = useState(false);
  const [antiguedadLaboral, setAntiguedadLaboral] = useState("");
  const [esMoroso, setEsMoroso] = useState(false);
  const [esIndependiente, setEsIndependiente] = useState(false);
  const [esEstable, setEsEstable] = useState(false);
  const [depositoRegular, setDepositoRegular] = useState(false);
  const [deudaTotal, setDeudaTotal] = useState("");
  const [mayorRetiro12, setMayorRetiro12] = useState("");
  const [mayorRetiro6, setMayorRetiro6] = useState("");
  const [tiempoCuentaAhorros, setTiempoCuentaAhorros] = useState("");
  const [totalDepositos, setTotalDepositos] = useState("");
  const { id } = useParams();
  const [titleClienteForm, setTitleClienteForm] = useState("");
  const navigate = useNavigate();
  
  const [open, setOpen] = useState(false);

  const guardaCliente = (e) => {
    e.preventDefault();

    const cliente = { rut, nombre, apellidos, edad, ingresos, saldo, saldoPositivo, antiguedadLaboral, 
        esMoroso, esIndependiente, esEstable, depositoRegular, deudaTotal, mayorRetiro12, mayorRetiro6, tiempoCuentaAhorros, totalDepositos, id};
      if(id) {
      //Actualizar Datos Empelado
      clienteService
        .update(cliente)
        .then((response) => {
          console.log("Empleado ha sido actualizado.", response.data);
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar actualizar datos del empleado.",
            error
          );
        });
    } else {
        //Crear nuevo cliente
        clienteService
        .create(cliente)
        .then((response) => {
            console.log("Se ha añadido un nuevo cliente.", response.data);
        })
        .catch((error) => {
            console.log(
            "Ha ocurrido un error al intentar crear nuevo cliente.",
            error
            );
        });
    }
  };

  // Cargar datos del cliente si estamos en modo edición
  useEffect(() => {
    if (id) {
      setTitleClienteForm("Editando Cliente:");
      clienteService
        .get(id)
        .then((response) => {
          const cliente = response.data;
          setRut(cliente.rut);
          setNombre(cliente.nombre);
          setApellidos(cliente.apellidos);
          setEdad(cliente.edad);
          setIngresos(cliente.ingresos);
          setSaldo(cliente.saldo);
          setSaldoPositivo(cliente.saldoPositivo);
          setAntiguedadLaboral(cliente.antiguedadLaboral);
          setEsMoroso(cliente.esMoroso);
          setEsIndependiente(cliente.esIndependiente);
          setEsEstable(cliente.esEstable);
          setDepositoRegular(cliente.depositoRegular);
          setDeudaTotal(cliente.deudaTotal);
          setMayorRetiro12(cliente.mayorRetiro12);
          setMayorRetiro6(cliente.mayorRetiro6);
          setTiempoCuentaAhorros(cliente.tiempoCuentaAhorros);
          setTotalDepositos(cliente.totalDepositos);
        })
        .catch((error) => {
          console.error("Error al cargar los datos del cliente:", error);
        });
    }
    else{
      setTitleClienteForm("NUEVO CLIENTE");
    }
  }, [id]);


const handleClick = () => {
  setOpen(true);
};

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpen(false);
};


  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="center" // Alinea a la derecha
      padding={4}
      component="form"
      onSubmit={guardaCliente}
    >
      <h3> {titleClienteForm} </h3>
      <hr />
        <FormControl fullWidth>
          <TextField
            id="rut"
            label="Rut"
            value={rut}
            variant="standard"
            onChange={(e) => setRut(e.target.value)}
            helperText="Ej. 12.587.698-8"
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="nombre"
            label="Nombre"
            value={nombre}
            variant="standard"
            onChange={(e) => setNombre(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="apellidos"
            label="Apellidos"
            value={apellidos}
            variant="standard"
            onChange={(e) => setApellidos(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="edad"
            label="Edad"
            type="number"
            value={edad}
            variant="standard"
            onChange={(e) => setEdad(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="ingresos"
            label="Ingresos"
            type="number"
            inputMode="decimal"
            value={ingresos}
            variant="standard"
            onChange={(e) => setIngresos(e.target.value)}
            helperText="Ingresos mensuales en Pesos Chilenos"
          />
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend">¿Tiene alguna morosidad o deuda pendiente?</FormLabel>
          <RadioGroup
            row
            value={esMoroso  ? "true" : "false"}
            onChange={(e) => setEsMoroso(e.target.value === "true")}
          >
            <FormControlLabel value="true" control={<Radio />} label="Sí" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend">¿Trabaja de forma independiente?</FormLabel>
          <RadioGroup
            row
            value={esIndependiente ? "true" : "false"}
            onChange={(e) => setEsIndependiente(e.target.value === "true")}
          >
            <FormControlLabel value="true" control={<Radio />} label="Sí" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        {esIndependiente && (
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Teniendo en cuenta los ingresos de los últimos años:
            </FormLabel>
            <RadioGroup
              row
              value={esEstable ? "true" : "false"}
              onChange={(e) => setEsEstable(e.target.value === "true")}
            >
              <FormControlLabel value="true" control={<Radio />} label="Soy estable" />
              <FormControlLabel value="false" control={<Radio />} label="No soy estable" />
            </RadioGroup>
          </FormControl>
        )}

        {!esIndependiente && (
          <FormControl fullWidth>
            <TextField
              id="antiguedadLaboral"
              label="Antigüedad Laboral"
              type="number"
              value={antiguedadLaboral}
              variant="standard"
              onChange={(e) => setAntiguedadLaboral(e.target.value)}
              helperText="Antigüedad en el empleo actual (años)"
            />
          </FormControl>
        )}

        <FormControl fullWidth>
          <TextField
            id="deudaTotal"
            label="Deudas"
            type="number"
            value={deudaTotal}
            variant="standard"
            onChange={(e) => setDeudaTotal(e.target.value)}
            helperText="Suma de todas las deudas en Pesos Chilenos"
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="saldo"
            label="Saldo"
            type="number"
            value={saldo}
            variant="standard"
            onChange={(e) => setSaldo(e.target.value)}
            helperText="Saldo en la cuenta de ahorros o inversiones"
          />
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend">En los últimos 12 meses, ¿ha mantenido un saldo positivo en la cuenta, sin retiros significativos?</FormLabel>
          <RadioGroup
            row
            value={saldoPositivo  ? "true" : "false"}
            onChange={(e) => setSaldoPositivo(e.target.value === "true")}
          >
            <FormControlLabel value="true" control={<Radio />} label="Sí" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend">¿Realiza depósitos en la cuenta mensual o trimestralmente?</FormLabel>
          <RadioGroup
            row
            value={depositoRegular  ? "true" : "false"}
            onChange={(e) => setDepositoRegular(e.target.value === "true")}
          >
            <FormControlLabel value="true" control={<Radio />} label="Sí" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        {depositoRegular && (
          <FormControl fullWidth>
          <TextField
            id="totalDepositos"
            label="Depositos"
            type="number"
            value={totalDepositos}
            variant="standard"
            onChange={(e) => setTotalDepositos(e.target.value)}
            helperText="Suma de depósitos realizados durante el último año en Pesos Chilenos"
          />
        </FormControl>
        )}

        <FormControl fullWidth>
          <TextField
            id="antiguedadCuenta"
            label="Antigüedad de la cuenta"
            type="number"
            value={tiempoCuentaAhorros}
            variant="standard"
            onChange={(e) => setTiempoCuentaAhorros(e.target.value)}
            helperText="Antigüedad de la cuenta de ahorros, en años"
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="mayorRetiro12"
            label="Mayor retiro en el último año"
            type="number"
            value={mayorRetiro12}
            variant="standard"
            onChange={(e) => setMayorRetiro12(e.target.value)}
            helperText="En Pesos Chilenos"
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="mayorRetiro6"
            label="Mayor retiro en los últimos 6 meses"
            type="number"
            value={mayorRetiro6}
            variant="standard"
            onChange={(e) => setMayorRetiro6(e.target.value)}
            helperText="En Pesos Chilenos"
          />
        </FormControl>
        
        <FormControl>
          <Button
            variant="contained"
            color="info"
            onClick={(e) => {
              e.preventDefault();
              guardaCliente(e);
              handleClick();
            }}
            style={{ marginTop: '0.5rem' }}
            startIcon={<SaveIcon />}
          >
            GUARDAR
          </Button>
      </FormControl>

      <Snackbar 
        open={open} 
        autoHideDuration={3000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Cliente guardado correctamente.
        </Alert>
      </Snackbar>

      <Link to="/clientes/inicio">Volver a la lista de Clientes</Link>
        <br>
        
        </br>

        <Typography align="center" style={{ marginBottom: '8px', fontWeight: 'bold', color: "secondary"}}>
          Una vez guardado, añade documentos para que se puedan corroborar los datos indicados:
        </Typography>

        <FormControl>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate(`/clientes/documentos/${rut}`)}
            style={{ marginTop: "0.5rem" }}
            startIcon={<AddIcon />}
          >
            Añadir Documentos
          </Button>
        </FormControl>
        
      <hr />
      <Link to="/clientes/inicio">Volver a la lista de Clientes</Link>
    </Box>
  );
};
export default NuevoCliente;