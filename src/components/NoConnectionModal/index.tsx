import { Modal, Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { NoConnectionModalProps } from "./types";

const NoConnectionModal: React.FC<NoConnectionModalProps> = ({
  open,
  handleClose,
}) => {
  const { t } = useTranslation();
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          {t("noConnection")}
        </Typography>
        <Button onClick={handleClose} sx={{ mt: 2 }}>
          {t("close")}
        </Button>
      </Box>
    </Modal>
  );
};

export default NoConnectionModal;
