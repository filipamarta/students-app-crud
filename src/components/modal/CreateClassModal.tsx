import React from "react";
import { ErrorMessage, Formik, FormikHelpers } from "formik";
import { Button, DialogActions, TextField } from "@mui/material";
import styles from "./modal.module.css";
import { ExtendedStudentClass, StudentClass } from "../../lib/definitions";
import { createClassValidationSchema } from "../../lib/utils";
import { useStudentClass } from "../../contexts/useStudentClass";
import ModalLayout from "./ModalLayout";
import { constants } from "../../lib/contants";

const CreateClassModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { addClass, studentClassData } = useStudentClass();

  const initialValues: ExtendedStudentClass = {
    name: "",
    year: "",
    combined: "",
  };

  const handleOnSubmit = (
    values: StudentClass,
    actions: FormikHelpers<StudentClass>
  ) => {
    addClass({
      name: values.name,
      year: values.year,
    });
    actions.setSubmitting(false);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      modalName="Create Class"
      ariaLabel="Create Class"
    >
      <Formik
        initialValues={initialValues}
        onSubmit={handleOnSubmit}
        validationSchema={createClassValidationSchema(studentClassData)}
      >
        {({
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleSubmit,
          handleBlur,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className={styles.row}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    (touched.name && Boolean(errors.name)) ||
                    (touched.combined && Boolean(errors.combined))
                  }
                  helperText={
                    errors.combined ? (
                      <ErrorMessage name="combined" />
                    ) : (
                      <ErrorMessage name="name" />
                    )
                  }
                  variant="standard"
                />
              </div>
              <div className={styles.row}>
                <TextField
                  fullWidth
                  id="year"
                  name="year"
                  label="Year"
                  value={values.year}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    (touched.year && Boolean(errors.year)) ||
                    (touched.combined && Boolean(errors.combined))
                  }
                  helperText={
                    errors.combined ? (
                      <ErrorMessage name="combined" />
                    ) : (
                      <ErrorMessage name="year" />
                    )
                  }
                  variant="standard"
                />
              </div>
              <DialogActions>
                <Button
                  sx={{ textTransform: "uppercase" }}
                  onClick={handleClose}
                >
                  {constants.modals.create.cancel}
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  sx={{ textTransform: "uppercase" }}
                >
                  {constants.modals.create.create}
                </Button>
              </DialogActions>
            </form>
          );
        }}
      </Formik>
    </ModalLayout>
  );
};

export default CreateClassModal;
