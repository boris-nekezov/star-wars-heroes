import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Box display="flex" justifyContent="center" m={10}>
        <Typography variant="h1">{t("forgotPassword")}</Typography>
      </Box>
      <Box display="flex" justifyContent="center" m={10}>
        <ForgotPasswordForm />
      </Box>
    </>
  );
};

export default ForgotPasswordPage;
