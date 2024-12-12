import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, useTheme } from "@mui/material";
import { useStudentClass } from "../../contexts/useStudentClass";
import styles from "./classesList.module.css";
import { StudentClass } from "../../lib/definitions";
import { constants } from "../../lib/contants";

const ClassesList = ({
  onDelete,
  onEdit,
}: {
  onDelete: (classElement: StudentClass) => void;
  onEdit: (classElement: StudentClass) => void;
}) => {
  const theme = useTheme();
  const { studentClassData } = useStudentClass();

  return (
    <>
      {studentClassData.length > 0 ? (
        <>
          <p className={styles.title}>Class name</p>
          <ul className={styles.list}>
            {studentClassData.map((classElement, id) => {
              return (
                <li key={`${classElement.name}-${id}`}>
                  <p>
                    {classElement.name} - {classElement.year}
                  </p>
                  <div className={styles.actions}>
                    <IconButton
                      aria-label="edit class"
                      color="primary"
                      onClick={() => onEdit(classElement)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete class"
                      sx={{ color: theme.custom.red[500] }}
                      onClick={() => onDelete(classElement)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <>
          <p>{constants.classesList.empty.text}</p>
        </>
      )}
    </>
  );
};

export default ClassesList;
