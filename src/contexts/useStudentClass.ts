import { useContext } from "react";
import { StudentClassContext } from "./StudentClassContext";

export const useStudentClass = () => {
  const contextValue = useContext(StudentClassContext);
  if (!contextValue) {
    throw new Error(
      `useStudentClass must be called from within an StudentClassContextProvider`
    );
  }
  return contextValue;
};
