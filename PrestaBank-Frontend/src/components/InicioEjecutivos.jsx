import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import creditoService from "../services/credito.service";
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
import CheckIcon from "@mui/icons-material/Check";
import InfoIcon from "@mui/icons-material/Info";


const InicioEjecutivos = () => {
    const [creditos, setCreditos] = useState([]);
    const navigate = useNavigate();
  
    const init = () => {
      creditoService
        .getCreditos()
        .then((response) => {
          console.log("Mostrando listado de todos los creditos.", response.data);
          setCreditos(response.data || []);
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar mostrar listado de todos los creditos.",
            error
          );
        });
    };
  
    useEffect(() => {
      init();
    }, []);

    const visualizaInfo = (id) => {
      navigate(`/ejecutivos/credito-info/${id}`);
    };

    const detallar = (id) => {
        navigate(`/ejecutivos/info/${id}`);
      };
  

    const elimina = (id) => {
        creditoService
        .remove(id)
        .then((response) => {
            console.log("Solicitud eliminada de la lista.", response.data);
            init();
          })
          .catch((error) => {
            console.log(
              "No se ha podido eliminar.",
              error
            );
          });
      };
  

    const compruebaDocs = (credito) => {
        creditoService
        .revisionInicial(credito)
        .then((response) => {
          console.log("Revisando documentos.", response.data);
          init();
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
                init();  // Actualiza la lista de créditos
            })
            .catch((error) => {
                console.error("Error al actualizar el estado.", error);
            });
    };

    return (
    <TableContainer component={Paper}>
          <br />
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
            <TableRow>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    Rut del Cliente
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    Tipo de préstamo
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    Estado de solicitud
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    Operaciones
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
                    <TableCell align="left">{credito.tipoPrestamo}</TableCell>
                    <TableCell align="left">{credito.estado}</TableCell>
                    <TableCell align="left"> {/* Añadir esta celda para operaciones */}
                        <Button
                            variant="contained"
                            color="info"
                            size="small"
                            onClick={() => detallar(credito.id)}
                            style={{ marginLeft: "0.5rem" }}
                            startIcon={<InfoIcon />}
                        >
                            Información detallada
                        </Button>

                        {credito.estado === "EN_EVALUACION" && (
                            <Button
                                variant="contained"
                                color="info"
                                size="small"
                                onClick={() => visualizaInfo(credito.id)}
                                style={{ marginLeft: "0.5rem" }}
                                startIcon={<AddIcon />}
                            >
                                Evaluar
                            </Button>
                        )}
                        {credito.estado === "EN_REVISION_INICIAL" && (
                            <Button
                                variant="contained"
                                color="success"
                                size="small"
                                onClick={() => compruebaDocs(credito)}
                                style={{ marginLeft: "0.5rem" }}
                                startIcon={<CheckIcon />}
                            >
                                Chequear documentación
                            </Button>
                        )}
                        {credito.estado === "CANCELADA_POR_CLIENTE" && (
                            <Button
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={() => elimina(credito.id)}
                                style={{ marginLeft: "0.5rem" }}
                                startIcon={<CheckIcon />}
                            >
                                Eliminar solicitud
                            </Button>
                        )}
                        {credito.estado === "EN_APROBACION_FINAL" && (
                            <Button
                                variant="contained"
                                color="success"
                                size="small"
                                onClick={() => cambiarEstado(credito.id, "APROBADA")}
                                style={{ marginLeft: "0.5rem" }}
                                startIcon={<CheckIcon />}
                            >
                                Aprobar
                            </Button>
                        )}
                        {credito.estado === "APROBADA" && (
                            <Button
                                variant="contained"
                                color="success"
                                size="small"
                                onClick={() => cambiarEstado(credito.id, "EN_DESEMBOLSO")}
                                style={{ marginLeft: "0.5rem" }}
                                startIcon={<CheckIcon />}
                            >
                                Lista para el Desembolso
                            </Button>
                        )}
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
    </TableContainer>
    );
}; 

export default InicioEjecutivos;