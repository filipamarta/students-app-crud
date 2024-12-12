import ModalLayout from "./ModalLayout";
import { ErrorMessage, Formik, FormikHelpers } from "formik";
import { Button, DialogActions, MenuItem, TextField } from "@mui/material";
import styles from "./modal.module.css";
import { Student } from "../../lib/definitions";
import { useStudents } from "../../contexts/useStudents";
import { useStudentClass } from "../../contexts/useStudentClass";
import { editStudentValidationSchema } from "../../lib/utils";
import { constants } from "../../lib/contants";

const EditStudentModal = ({
  open,
  onClose,
  selected,
}: {
  open: boolean;
  selected: Student;
  onClose: () => void;
}) => {
  const { editStudent } = useStudents();
  const { studentClassData } = useStudentClass();

  const initialValues: Student = selected;

  const handleOnSubmit = (values: Student, actions: FormikHelpers<Student>) => {
    editStudent(values);
    actions.setSubmitting(false);
    onClose();
  };

  return (
    <ModalLayout
      open={open}
      handleClose={onClose}
      modalName="Edit student"
      zIndex="2"
      ariaLabel="Edit Student"
    >
      <Formik
        initialValues={initialValues}
        onSubmit={handleOnSubmit}
        validationSchema={editStudentValidationSchema}
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
                  variant="standard"
                  disabled
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
                <Button sx={{ textTransform: "uppercase" }} onClick={onClose}>
                  {constants.modals.edit.cancel}
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  sx={{ textTransform: "uppercase" }}
                >
                  {constants.modals.edit.edit}
                </Button>
              </DialogActions>
            </form>
          );
        }}
      </Formik>
    </ModalLayout>
  );
};

export default EditStudentModal;
