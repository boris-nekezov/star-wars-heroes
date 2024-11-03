import { Button, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = useCallback(
    (lng: string) => {
      i18n.changeLanguage(lng);
    },
    [i18n],
  );

  return (
    <Box>
      <Button onClick={() => changeLanguage("en")}>English</Button>
      <Button onClick={() => changeLanguage("bg")}>Български</Button>
    </Box>
  );
};

export default LanguageSwitcher;
