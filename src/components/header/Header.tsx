import { useState } from "react";
import styles from "./header.module.css";
import CreateStudentModal from "../modal/CreateStudentModal";
import CreateClassModal from "../modal/CreateClassModal";
import ManageClassesModal from "../modal/ManageClassesModal";
import { IconButton, useTheme, useMediaQuery, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { constants } from "../../lib/contants";
import MenuMobileModal from "../modal/MenuMobileModal";

const Header = () => {
  const theme = useTheme();
  const upMediumMediaQuery = useMediaQuery(theme.breakpoints.up("md"));

  const [openCreateStudentModal, setOpenCreateStudentModal] = useState(false);
  const [openCreateClassModal, setOpenCreateClassModal] = useState(false);
  const [openManageClassesModal, setOpenManageClassesModal] = useState(false);
  const [openMenuMobileModal, setOpenMenuMobileModal] = useState(false);

  const handleClickOpenCreateStudentModal = () => {
    setOpenCreateStudentModal(true);
  };

  const handleClickOpenCreateClassModal = () => {
    setOpenCreateClassModal(true);
  };

  const handleClickOpenManageClassesModal = () => {
    setOpenManageClassesModal(true);
  };

  const handleClickOpenMenuMobile = () => {
    setOpenMenuMobileModal(true);
  };

  return (
    <>
      <header className={styles.header}>
        <h1>{constants.header.title}</h1>
        <nav>
          {upMediumMediaQuery ? (
            <ul>
              <li>
                <Button
                  variant="contained"
                  onClick={handleClickOpenCreateStudentModal}
                >
                  {constants.header.createStudent}
                </Button>
              </li>
              <li>
                <Button
                  variant="contained"
                  onClick={handleClickOpenCreateClassModal}
                >
                  {constants.header.createClass}
                </Button>
              </li>
              <li>
                <Button
                  variant="contained"
                  onClick={handleClickOpenManageClassesModal}
                >
                  {constants.header.manageClasses}
                </Button>
              </li>
            </ul>
          ) : (
            <IconButton
              aria-label="open menu mobile"
              color="primary"
              onClick={handleClickOpenMenuMobile}
            >
              <MenuIcon />
            </IconButton>
          )}
        </nav>
      </header>
      <CreateStudentModal
        open={openCreateStudentModal}
        setOpen={setOpenCreateStudentModal}
      />
      <CreateClassModal
        open={openCreateClassModal}
        setOpen={setOpenCreateClassModal}
      />
      <ManageClassesModal
        open={openManageClassesModal}
        setOpen={setOpenManageClassesModal}
      />
      <MenuMobileModal
        open={openMenuMobileModal}
        setOpen={setOpenMenuMobileModal}
        handleClickOpenCreateStudentModal={handleClickOpenCreateStudentModal}
        handleClickOpenCreateClassModal={handleClickOpenCreateClassModal}
        handleClickOpenManageClassesModal={handleClickOpenManageClassesModal}
      />
    </>
  );
};

export default Header;
