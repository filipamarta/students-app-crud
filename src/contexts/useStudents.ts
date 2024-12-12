import { useContext } from "react";
import { StudentsContext } from "./StudentsContext";

export const useStudents = () => {
  const contextValue = useContext(StudentsContext);
  if (!contextValue) {
    throw new Error(
      `useStudents must be called from within an StudentsContextProvider`
    );
  }
  return contextValue;
};
