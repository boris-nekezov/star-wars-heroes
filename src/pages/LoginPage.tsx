import LoginForm from "../components/LoginForm";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Box display="flex" justifyContent="center" m={10}>
        <Typography variant="h1">{t("login")}</Typography>
      </Box>
      <Box display="flex" justifyContent="center" m={10}>
        <LoginForm />
      </Box>
    </>
  );
};

export default LoginPage;
