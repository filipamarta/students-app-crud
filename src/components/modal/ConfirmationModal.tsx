import { constants } from "../../lib/contants";
import ModalLayout from "./ModalLayout";
import { Button, DialogActions, Snackbar } from "@mui/material";

const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  handleCloseSnackBar,
  openSnackBar,
  snackBarMessage,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  openSnackBar: boolean;
  handleCloseSnackBar: () => void;
  snackBarMessage: string;
}) => {
  return (
    <>
      <ModalLayout
        open={open}
        handleClose={onClose}
        modalName="Are you sure you want to delete?"
        zIndex="2"
        ariaLabel="Are you sure you want to delete?"
      >
        <DialogActions>
          <Button sx={{ textTransform: "uppercase" }} onClick={onClose}>
            {constants.modals.confirmation.no}
          </Button>
          <Button sx={{ textTransform: "uppercase" }} onClick={onConfirm}>
            {constants.modals.confirmation.yes}
          </Button>
        </DialogActions>
      </ModalLayout>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
        message={snackBarMessage}
      />
    </>
  );
};

export default ConfirmationModal;
