import { Dialog, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { ReactNode } from "react";
import styles from "./modal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import ReactDOM from "react-dom";

const Modal = ({ children }: { children: ReactNode }) => {
  /* 
  React Portals let you render components outside their parent DOM, useful for modals and tooltips. 
  They help manage UI overlays and maintain proper layering, improving accessibility and avoiding layout issues. 
  */
  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(<div>{children}</div>, modalRoot);
};

const ModalLayout = ({
  open,
  handleClose,
  children,
  modalName,
  zIndex,
  ariaLabel,
}: {
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
  modalName: string;
  zIndex?: string;
  ariaLabel: string;
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Modal>
      <Dialog
        open={open}
        onClose={handleClose}
        className={styles.modal}
        sx={{ zIndex }}
        fullScreen={fullScreen}
        aria-label={ariaLabel}
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <h2>{modalName}</h2>
            <IconButton
              aria-label="close modal"
              sx={{ color: theme.custom.neutral[400] }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </div>
          {children}
        </div>
      </Dialog>
    </Modal>
  );
};

export default ModalLayout;
