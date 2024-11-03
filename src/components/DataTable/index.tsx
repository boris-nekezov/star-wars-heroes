import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Alert,
} from "@mui/material";
import NoConnectionModal from "../NoConnectionModal";
import type { DataTableProps } from "./types";

const DataTable: React.FC<DataTableProps> = ({ data, loading, error }) => {
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [isOffline, setIsOffline] = useState<boolean>(false);

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    [],
  );

  const handleCloseModal = useCallback(() => {
    setIsOffline(false);
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    if (error === "Rejected") {
      setIsOffline(true);
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [error]);

  const currentData = useMemo(() => {
    return data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [data, page, rowsPerPage]);

  const noConnectionModalProps = useMemo(
    () => ({
      open: isOffline,
      handleClose: handleCloseModal,
    }),
    [isOffline, handleCloseModal],
  );

  return (
    <Paper>
      <NoConnectionModal {...noConnectionModalProps} />
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Mass</TableCell>
                <TableCell>Height</TableCell>
                <TableCell>Hair Color</TableCell>
                <TableCell>Skin Color</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData.map(person => {
                const { name, mass, height, hair_color, skin_color } = person;
                return (
                  <TableRow key={name}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{mass}</TableCell>
                    <TableCell>{height}</TableCell>
                    <TableCell>{hair_color}</TableCell>
                    <TableCell>{skin_color}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
    </Paper>
  );
};

export default React.memo(DataTable);
