import ModalLayout from "./ModalLayout";
import MenuMobile from "../menuMobile/MenuMobile";

const MenuMobileModal = ({
  open,
  setOpen,
  handleClickOpenCreateStudentModal,
  handleClickOpenCreateClassModal,
  handleClickOpenManageClassesModal,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClickOpenCreateStudentModal: () => void;
  handleClickOpenCreateClassModal: () => void;
  handleClickOpenManageClassesModal: () => void;
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenCreateStudent = () => {
    handleClickOpenCreateStudentModal();
    handleClose();
  };

  const handleClickOpenCreateClass = () => {
    handleClickOpenCreateClassModal();
    handleClose();
  };

  const handleClickOpenManageClasses = () => {
    handleClickOpenManageClassesModal();
    handleClose();
  };

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      modalName=""
      ariaLabel="Menu mobile"
    >
      <MenuMobile
        handleClickOpenCreateStudentModal={handleClickOpenCreateStudent}
        handleClickOpenCreateClassModal={handleClickOpenCreateClass}
        handleClickOpenManageClassesModal={handleClickOpenManageClasses}
      />
    </ModalLayout>
  );
};

export default MenuMobileModal;
