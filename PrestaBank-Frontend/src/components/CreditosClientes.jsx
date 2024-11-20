import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import creditoService from "../services/credito.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";


const Creditos = () => {
    const { rut } = useParams();
    const navigate = useNavigate();
    const [creditos, setCreditos] = useState([]);

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
    
    const formatearEstado = (estado) => {
        switch (estado) {
          case "EN_REVISION_INICIAL":
            return "En Revisión Inicial";
          case "PENDIENTE_DOCUMENTACION":
            return "Pendiente de Documentación";
          case "EN_EVALUACION":
            return "En Evaluación";
          case "PRE_APROBADA":
            return "Pre Aprobada";
          case "EN_APROBACION_FINAL":
            return "En Aprobación Final";
          case "APROBADA":
            return "Aprobada";
          case "RECHAZADA":
            return "Rechazada";
          case "CANCELADA_POR_CLIENTE":
            return "Cancelada por el Cliente";
          case "EN_DESEMBOLSO":
            return "En Desembolso";
          default:
            return estado;
        }
      };

    const buscarCreditos = async () => {
      creditoService
        .getCreditosRut(rut)
        .then((response) => {
          console.log("Mostrando listado de créditos.", response.data);
          setCreditos(response.data || []);
          console.log(rut);
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar mostrar listado de todos los empleados.",
            error
          );
        });
    };

    useEffect(() => {
        buscarCreditos();
      }, []);

    return  (
        <TableContainer component={Paper}>
          <br />
          <Link
             to={`/clientes/credito/nuevo/${rut}`}
            style={{ textDecoration: "none", marginBottom: "1rem" }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
            >
              Solicitar un nuevo crédito
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
                  Valor de la propiedad
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Tipo de préstamo solicitado
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Monto
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Plazo
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Tasa de interés
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  CuotaMensual
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Estado
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Operaciones disponibles para la solicitud
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {creditos.map((credito) => (
                <TableRow
                  key={credito.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{credito.rut}</TableCell>
                  <TableCell align="left">{credito.valorPropiedad.toFixed(2)}</TableCell>
                  <TableCell align="left">{formatearNombre(credito.tipoPrestamo)}</TableCell>
                  <TableCell align="left">{credito.monto.toFixed(2)}</TableCell>
                  <TableCell align="left">{credito.plazo} años</TableCell>
                  <TableCell align="left">{credito.tasaInteres.toFixed(2)} %</TableCell>
                  <TableCell align="left">{credito.coutaMensual?.toFixed(2)||"0.00"}</TableCell>
                  <TableCell align="left">{formatearEstado(credito.estado)}</TableCell>
                  
                  <TableCell>
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      onClick={() => calculaCosto(credito.id)}
                      style={{ marginLeft: "0.5rem" }}
                      startIcon={<InfoIcon />}
                    >
                      Costo Total
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div style={{ margin: '20px', textAlign: 'center' }}>
            <Link to={`/clientes/seguimiento/${cliente.rut}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                Volver a mi lista de créditos
            </Link>
        </div>
        </TableContainer>
        
        );
};
export default Creditos;