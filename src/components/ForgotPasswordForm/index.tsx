import { useState, useMemo, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { validateEmail } from "../../features/auth/authSlice";
import { selectAuthError } from "../../features/auth/authSelectors";
import { useTranslation } from "react-i18next";
import { TextField, Button, Box, Typography } from "@mui/material";

const ForgotPasswordForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const error = useAppSelector(selectAuthError);
  const [success, setSuccess] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      dispatch(validateEmail(email));
      if (!error) {
        setSuccess(true);
      }
    },
    [dispatch, email, error],
  );

  const errorMessage = useMemo(
    () =>
      error && (
        <Box>
          <Typography color="error" variant="body1">
            {t("invalidCredentials")}
          </Typography>
        </Box>
      ),
    [error, t],
  );

  const successMessage = useMemo(
    () => success && <div>{t("resetLinkSent")}</div>,
    [success, t],
  );

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label={t("email")}
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      {errorMessage}
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Button type="submit" variant="contained" fullWidth>
          {t("submit")}
        </Button>
      </Box>
      {successMessage}
    </form>
  );
};

export default ForgotPasswordForm;
