import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import creditoService from "../services/seguimiento.service";
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


const InfoEstado = () => {
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

      const addDocumentos = (rut) => {
        console.log("Printing rut", rut);
        navigate(`/clientes/documentos/${rut}`);
      };

    const buscarCreditos = async () => {
        console.log(rut)
      creditoService
        .getCreditosRut(rut)
        .then((response) => {
          console.log("Mostrando listado de créditos.", response.data);
          setCreditos(response.data || []);
          console.log(rut);
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar mostrar listado de todos los creditos.",
            error
          );
        });
    };

    useEffect(() => {
        buscarCreditos();
      }, []);

    const cambiarEstado = (id, estado) => {
        console.log('Enviando estado:', estado);
        creditoService
            .actualizarEstado(id, estado)
            .then(() => {
                console.log("Estado actualizado.");
                buscarCreditos();  // Actualiza la lista de créditos
            })
            .catch((error) => {
                console.error("Error al actualizar el estado.", error);
            });
    };

    return  (
        <TableContainer component={Paper}>
          <br /> <br />
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Id de la solicitud
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Rut
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Tipo de préstamo solicitado
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Estado
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Operaciones disponibles
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {creditos.map((credito) => (
                <TableRow
                  key={credito.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{credito.idSolicitud}</TableCell>
                  <TableCell align="left">{credito.rut}</TableCell>
                  <TableCell align="left">{formatearNombre(credito.tipoPrestamo)}</TableCell>
                  <TableCell align="left">{formatearEstado(credito.estado)}</TableCell>
                  {credito.estado === "PENDIENTE_DOCUMENTACION" && (
                    <TableCell>
                      <Button
                        variant="contained"
                        color="info"
                        size="small"
                        onClick={() => addDocumentos(credito.rut)}
                        style={{ marginLeft: "0.5rem" }}
                        startIcon={<AddIcon />}
                      >
                        Añadir documentación
                      </Button>
                    </TableCell>
                    )}
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => cambiarEstado(credito.idSolicitud, "CANCELADA_POR_CLIENTE")}
                      style={{ marginLeft: "0.5rem" }}
                      startIcon={<CancelIcon />}
                    >
                      Cancelar
                    </Button>
                  </TableCell>

                  {credito.estado === "PRE_APROBADA" && (
                    <TableCell>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => cambiarEstado(credito.idSolicitud, "EN_APROBACION_FINAL")}
                        style={{ marginLeft: "0.5rem" }}
                        startIcon={<CheckIcon />}
                      >
                        Aceptar condiciones
                      </Button>
                    </TableCell>
                    )}

                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div style={{ margin: '20px', textAlign: 'center' }}>
          <Link 
            to={`/clientes/solicita-credito/${rut}`} 
            style={{ textDecoration: 'none', color: '#1976d2' }}
        >
              Volver a mi lista de solicitudes
          </Link>
        </div>
        </TableContainer>
        );
};
export default InfoEstado;