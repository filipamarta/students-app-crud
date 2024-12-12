import { IconButton, useTheme, useMediaQuery } from "@mui/material";
import { Student } from "../../lib/definitions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./studentCard.module.css";
import { useStudents } from "../../contexts/useStudents";
import { useState } from "react";
import EditStudentModal from "../modal/EditStudentModal";
import ConfirmationModal from "../modal/ConfirmationModal";

const StudentsCard = ({
  firstName,
  lastName,
  email,
  studentId,
  studentClass,
}: Student) => {
  const theme = useTheme();
  const upMediumMediaQuery = useMediaQuery(theme.breakpoints.up("md"));
  const { deleteStudent, errorStudent } = useStudents();
  const [openConfirmationToDeleteModal, setOpenConfirmationToDeleteModal] =
    useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  /* HANDLE DELETE click */
  const handleDeleteClick = () => {
    setOpenConfirmationToDeleteModal(true);
  };
  const handleCloseConfirmationModal = () => {
    setOpenConfirmationToDeleteModal(false);
  };
  const handleConfirmationToDeleteClick = () => {
    deleteStudent({ studentId });
    handleCloseConfirmationModal();
    setOpenSnackBar(true);
  };

  /* HANDLE EDIT click */
  const handleEditClick = () => {
    setOpenEditModal(true);
  };
  const handleCloseEditStudentModal = () => {
    setOpenEditModal(false);
  };

  /* HANDLE SNACKBAR click */
  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  return (
    <>
      <div className={styles.card}>
        {upMediumMediaQuery && <div className={styles.image}></div>}
        <div className={styles.textContainer}>
          <p className={styles.fullname}>
            {firstName} {lastName}
          </p>
          <p className={styles.email}>{email}</p>
          <p className={styles.id}>ID: {studentId}</p>
        </div>
        <div className={styles.actions}>
          <IconButton
            aria-label="edit student"
            color="primary"
            onClick={handleEditClick}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete student"
            sx={{ color: theme.custom.red[500] }}
            onClick={handleDeleteClick}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <ConfirmationModal
        open={openConfirmationToDeleteModal}
        onClose={handleCloseConfirmationModal}
        onConfirm={handleConfirmationToDeleteClick}
        handleCloseSnackBar={handleCloseSnackBar}
        openSnackBar={openSnackBar}
        snackBarMessage={
          errorStudent
            ? "Failed to delete the student"
            : "Student deleted successfully."
        }
      />
      <EditStudentModal
        open={openEditModal}
        selected={{ firstName, lastName, email, studentId, studentClass }}
        onClose={handleCloseEditStudentModal}
      />
    </>
  );
};

export default StudentsCard;
