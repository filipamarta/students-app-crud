import ModalLayout from "./ModalLayout";
import { StudentClass } from "../../lib/definitions";
import { ErrorMessage, Formik, FormikHelpers } from "formik";
import { editClassValidationSchema } from "../../lib/utils";
import { Button, DialogActions, TextField } from "@mui/material";
import styles from "./modal.module.css";
import { constants } from "../../lib/contants";

const EditClassModal = ({
  open,
  selectedClass,
  onEdit,
  onClose,
}: {
  open: boolean;
  selectedClass: StudentClass;
  onEdit: (values: StudentClass) => void;
  onClose: () => void;
}) => {
  const initialValues: StudentClass = selectedClass;

  const handleOnSubmit = (
    values: StudentClass,
    actions: FormikHelpers<StudentClass>
  ) => {
    onEdit(values);
    actions.setSubmitting(false);
    onClose();
  };

  return (
    <ModalLayout
      open={open}
      handleClose={onClose}
      modalName="Edit Class"
      zIndex="2"
      ariaLabel="Edit Class"
    >
      <Formik
        initialValues={initialValues}
        onSubmit={handleOnSubmit}
        validationSchema={editClassValidationSchema}
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
                  error={touched.name && Boolean(errors.name)}
                  helperText={<ErrorMessage name="name" />}
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
                  error={touched.year && Boolean(errors.year)}
                  helperText={<ErrorMessage name="year" />}
                  variant="standard"
                />
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

export default EditClassModal;
