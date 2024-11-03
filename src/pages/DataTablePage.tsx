import { useEffect, useMemo, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import type { RootState } from "../app/store";
import { fetchStarWarsData } from "../features/starWars/services";
import DataTable from "../components/DataTable";

const DataTablePage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { data, loading, error } = useAppSelector(
    useCallback((state: RootState) => state.starWars, []),
  );

  const fetchStarWarsDataCallback = useCallback(() => {
    dispatch(fetchStarWarsData());
  }, [dispatch]);

  useEffect(() => {
    fetchStarWarsDataCallback();
  }, [fetchStarWarsDataCallback]);

  const memoizedData = useMemo(() => data, [data]);
  const memoizedLoading = useMemo(() => loading, [loading]);
  const memoizedError = useMemo(() => error, [error]);

  return (
    <>
      <Box display="flex" justifyContent="center" m={10}>
        <Typography variant="h2">{t("starWarsTable")}</Typography>
      </Box>
      <DataTable
        data={memoizedData}
        loading={memoizedLoading}
        error={memoizedError}
      />
    </>
  );
};

export default DataTablePage;
