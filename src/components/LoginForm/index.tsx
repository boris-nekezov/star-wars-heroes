import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  checkCredAndAddToken,
  loginInitial,
} from "../../features/auth/authSlice";
import { selectAuthError } from "../../features/auth/authSelectors";
import { useTranslation } from "react-i18next";
import { TextField, Button, Box, Link, Typography } from "@mui/material";

const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = useAppSelector(selectAuthError);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      dispatch(loginInitial({ email, password }));
      dispatch(checkCredAndAddToken({ email, password }));
      navigate("/success");
    },
    [dispatch, email, password, navigate],
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
      <TextField
        label={t("password")}
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      {errorMessage}
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Button type="submit" variant="contained" fullWidth>
          {t("login")}
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" margin={2}>
        <Link href="/forgot-password">{t("forgotPassword")}</Link>
      </Box>
    </form>
  );
};

export default LoginForm;
