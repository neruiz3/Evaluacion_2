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

    const addDocumentos = (rut) => {
        console.log("Printing rut", rut);
        navigate(`/clientes/documentos/${rut}`);
      };

    const calculaCosto = (id) => {
      navigate(`/clientes/costo-total/${id}`);
    };
    
    const revision = (credito) => {
      creditoService
        .revisionInicial(credito)
        .then((response) => {
          console.log("Revisando documentos.", response.data);
          buscarCreditos();
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar revisar la documentación.",
            error
          );
        });
    };

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
                  {credito.estado === "PENDIENTE_DOCUMENTACION" && (
                    <TableCell>
                      <Button
                        variant="contained"
                        color="info"
                        size="small"
                        onClick={() => revision(credito)}
                        style={{ marginLeft: "0.5rem" }}
                        startIcon={<AddIcon />}
                      >
                        Solicitar revision
                      </Button>
                    </TableCell>
                    )}
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => cambiarEstado(credito.id, "CANCELADA_POR_CLIENTE")}
                      style={{ marginLeft: "0.5rem" }}
                      startIcon={<CancelIcon />}
                    >
                      Cancelar
                    </Button>
                  </TableCell>
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

                  {credito.estado === "PRE_APROBADA" && (
                    <TableCell>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => cambiarEstado(credito.id, "EN_APROBACION_FINAL")}
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
        </TableContainer>
        );
};
export default Creditos;