import React from "react";
import { ErrorMessage, Formik, FormikHelpers } from "formik";
import { createStudentValidationSchema } from "../../lib/utils";
import { Button, MenuItem, DialogActions, TextField } from "@mui/material";
import { useStudents } from "../../contexts/useStudents";
import styles from "./modal.module.css";
import { useStudentClass } from "../../contexts/useStudentClass";
import { Student } from "../../lib/definitions";
import ModalLayout from "./ModalLayout";
import { constants } from "../../lib/contants";

const CreateStudentModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { addStudent, studentsData } = useStudents();
  const { studentClassData } = useStudentClass();

  const initialValues: Student = {
    firstName: "",
    lastName: "",
    email: "",
    studentId: "",
    studentClass: studentClassData.length > 0 ? [studentClassData[0]] : [],
  };

  const handleOnSubmit = (values: Student, actions: FormikHelpers<Student>) => {
    addStudent({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      studentClass: values.studentClass,
      studentId: values.studentId,
    });
    handleClose();
    actions.setSubmitting(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      modalName="Create Student"
      ariaLabel="Create Student"
    >
      <Formik
        initialValues={initialValues}
        onSubmit={handleOnSubmit}
        validationSchema={createStudentValidationSchema(studentsData)}
      >
        {({
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleSubmit,
          handleBlur,
          setFieldValue,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className={styles.row}>
                <TextField
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={<ErrorMessage name="firstName" />}
                  variant="standard"
                />
              </div>
              <div className={styles.row}>
                <TextField
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={<ErrorMessage name="lastName" />}
                  variant="standard"
                />
              </div>
              <div className={styles.row}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={<ErrorMessage name="email" />}
                  variant="standard"
                />
              </div>
              <div className={styles.row}>
                <TextField
                  fullWidth
                  id="studentId"
                  name="studentId"
                  label="Student ID"
                  value={values.studentId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.studentId && Boolean(errors.studentId)}
                  helperText={<ErrorMessage name="studentId" />}
                  variant="standard"
                />
              </div>
              <div className={styles.row}>
                <TextField
                  fullWidth
                  select
                  id="studentClass"
                  name="studentClass"
                  label="Class"
                  value={
                    values.studentClass[0]
                      ? `${values.studentClass[0].name}-${values.studentClass[0].year}`
                      : ""
                  }
                  defaultValue={
                    values.studentClass[0]
                      ? `${values.studentClass[0].name}-${values.studentClass[0].year}`
                      : ""
                  }
                  onChange={(e) => {
                    const [name, year] = e.target.value.split("-");
                    const selectedClass = studentClassData.find(
                      (classItem) =>
                        classItem.name === name && classItem.year === year
                    );
                    if (selectedClass) {
                      setFieldValue("studentClass", [selectedClass]);
                    }
                  }}
                  onBlur={handleBlur}
                  error={touched.studentClass && Boolean(errors.studentClass)}
                  helperText={<ErrorMessage name="studentClass" />}
                  variant="standard"
                >
                  {studentClassData.map((classElementName, id) => (
                    <MenuItem
                      key={id}
                      value={`${classElementName.name}-${classElementName.year}`}
                    >
                      {`${classElementName.name} - ${classElementName.year}`}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <DialogActions>
                <Button
                  onClick={handleClose}
                  sx={{ textTransform: "uppercase" }}
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

export default CreateStudentModal;
