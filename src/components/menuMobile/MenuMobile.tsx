import { Button } from "@mui/material";
import { constants } from "../../lib/contants";
import styles from "./menuMobile.module.css";
import theme from "../../theme";

const MenuMobile = ({
  handleClickOpenCreateStudentModal,
  handleClickOpenCreateClassModal,
  handleClickOpenManageClassesModal,
}: {
  handleClickOpenCreateStudentModal: () => void;
  handleClickOpenCreateClassModal: () => void;
  handleClickOpenManageClassesModal: () => void;
}) => {
  return (
    <ul className={styles.list}>
      <li>
        <Button
          variant="text"
          sx={{
            color: theme.custom.neutral[800],
          }}
          onClick={handleClickOpenCreateStudentModal}
        >
          {constants.header.createStudent}
        </Button>
      </li>
      <li>
        <Button
          variant="text"
          sx={{
            color: theme.custom.neutral[800],
          }}
          onClick={handleClickOpenCreateClassModal}
        >
          {constants.header.createClass}
        </Button>
      </li>
      <li>
        <Button
          variant="text"
          sx={{ color: theme.custom.neutral[800] }}
          onClick={handleClickOpenManageClassesModal}
        >
          {constants.header.manageClasses}
        </Button>
      </li>
    </ul>
  );
};

export default MenuMobile;
