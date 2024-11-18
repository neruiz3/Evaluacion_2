import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clienteService from "../services/cliente.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalculateIcon from "@mui/icons-material/Calculate";


const InicioClientes = () => {
    const [clientes, setClientes] = useState([]);
  
    const navigate = useNavigate();
  
    const init = () => {
      clienteService
        .getAll()
        .then((response) => {
          console.log("Mostrando listado de todos los empleados.", response.data);
          setClientes(response.data || []);
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar mostrar listado de todos los empleados.",
            error
          );
        });
    };
  
    useEffect(() => {
      init();
    }, []);

    const editaCliente = (id) => {
      console.log("Printing id", id);
      navigate(`/clientes/editar/${id}`);
    };

    const addDocumentos = (rut) => {
      console.log("Printing rut", rut);
      navigate(`/clientes/documentos/${rut}`);
    };

    const simulaCredito = () => {
      navigate(`/clientes/simula`);
    };

    const solicitaCredito = (rut) => {
      navigate(`/clientes/solicita-credito/${rut}`);
    };

    return (
    <TableContainer component={Paper}>
      <br />
      <Link
        to="/clientes/nuevo"
        style={{ textDecoration: "none", marginBottom: "1rem" }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
        >
          Añadir Cliente
        </Button>
      </Link>
      <br /> <br />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Rut
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Nombre
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Apellidos
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Operaciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientes.map((cliente) => (
            <TableRow
              key={cliente.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{cliente.rut}</TableCell>
              <TableCell align="left">{cliente.nombre}</TableCell>
              <TableCell align="left">{cliente.apellidos}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={() => editaCliente(cliente.id)}
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<EditIcon />}
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={() => addDocumentos(cliente.rut)}
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<AddIcon />}
                >
                  Añadir documentos
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={() => simulaCredito()}
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<CalculateIcon />}
                >
                  Simular un crédito
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={() => solicitaCredito(cliente.rut)}
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<AttachMoneyIcon />}
                >
                  Mis créditos
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
}; 

export default InicioClientes;