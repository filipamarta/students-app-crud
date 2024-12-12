import React, { useState } from "react";
import ModalLayout from "./ModalLayout";
import { Button, DialogActions } from "@mui/material";
import ClassesList from "../classesList/ClassesList";
import { useStudentClass } from "../../contexts/useStudentClass";
import { StudentClass } from "../../lib/definitions";
import ConfirmationModal from "./ConfirmationModal";
import EditClassModal from "./EditClassModal";
import { constants } from "../../lib/contants";

const ManageClassesModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { deleteClass, editClass, errorClass } = useStudentClass();
  const [openConfirmationToDeleteModal, setOpenConfirmationToDeleteModal] =
    useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [selectedClass, setSelectedClass] = useState<StudentClass>({
    name: "",
    year: "",
  });

  const resetSelectedClass = () => {
    setSelectedClass({ name: "", year: "" });
  };

  const handleClose = () => {
    setOpen(false);
    resetSelectedClass();
  };

  /* HANDLE DELETE click */
  const handleDeleteClick = (classElement: StudentClass) => {
    setOpenConfirmationToDeleteModal(true);
    setSelectedClass(classElement);
  };
  const handleCloseConfirmationModal = () => {
    setOpenConfirmationToDeleteModal(false);
    resetSelectedClass();
  };
  const handleConfirmationToDeleteClick = () => {
    deleteClass(selectedClass);
    handleCloseConfirmationModal();
    resetSelectedClass();
    setOpenSnackBar(true);
  };

  /* HANDLE EDIT click */
  const handleEditClick = (classElement: StudentClass) => {
    setOpenEditModal(true);
    setSelectedClass(classElement);
  };
  const handleCloseEditClassModal = () => {
    setOpenEditModal(false);
    resetSelectedClass();
  };
  const handleConfirmationToEditClick = (values: StudentClass) => {
    editClass({ selected: selectedClass, updated: values });
    resetSelectedClass();
  };

  /* HANDLE SNACKBAR click */
  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  return (
    <>
      <ModalLayout
        open={open}
        handleClose={handleClose}
        modalName="Manage classes"
        zIndex="1"
        ariaLabel="Manage classes"
      >
        <ClassesList onDelete={handleDeleteClick} onEdit={handleEditClick} />
        <DialogActions>
          <Button sx={{ textTransform: "uppercase" }} onClick={handleClose}>
            {constants.modals.manage.close}
          </Button>
        </DialogActions>
      </ModalLayout>

      <ConfirmationModal
        open={openConfirmationToDeleteModal}
        onClose={handleCloseConfirmationModal}
        onConfirm={handleConfirmationToDeleteClick}
        handleCloseSnackBar={handleCloseSnackBar}
        openSnackBar={openSnackBar}
        snackBarMessage={
          errorClass
            ? "Failed to delete the class."
            : "Class deleted successfully."
        }
      />
      <EditClassModal
        open={openEditModal}
        selectedClass={selectedClass}
        onEdit={handleConfirmationToEditClick}
        onClose={handleCloseEditClassModal}
      />
    </>
  );
};

export default ManageClassesModal;
