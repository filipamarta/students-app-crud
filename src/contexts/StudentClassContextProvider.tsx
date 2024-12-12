import { useState, useEffect, ReactNode } from "react";
import { StudentClass } from "../lib/definitions";
import { StudentClassContext } from "./StudentClassContext";

export const StudentClassContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [studentClassData, setStudentClassData] = useState<StudentClass[]>(
    () => {
      const storedData = localStorage.getItem("studentClass");
      return storedData ? JSON.parse(storedData) : [];
    }
  );
  const [errorClass, setErrorClass] = useState<string | null>(null); // If there are errors from saving on localstorage or CRUD, they will be shown here

  const addClass = ({ name, year }: StudentClass) => {
    try {
      setStudentClassData([...studentClassData, { name, year }]);
      setErrorClass(null);
    } catch (error) {
      setErrorClass(
        `Failed to add the class: ${{ name, year }}. Please try again.`
      );
      console.error(`An error occurred: ${error}`);
    }
  };

  const deleteClass = ({ name, year }: StudentClass) => {
    try {
      const updatedList = studentClassData.filter(
        (classElement) =>
          !(classElement.name === name && classElement.year === year)
      );
      setStudentClassData(updatedList);
      setErrorClass(null);
    } catch (error) {
      setErrorClass(
        `Failed to delete the class: ${{ name, year }}. Please try again.`
      );
      console.error(`An error occurred: ${error}`);
    }
  };

  const editClass = ({
    selected,
    updated,
  }: {
    selected: StudentClass;
    updated: StudentClass;
  }) => {
    try {
      const updatedList = studentClassData.map((classElement) =>
        classElement.name === selected.name &&
        classElement.year === selected.year
          ? { ...classElement, name: updated.name, year: updated.year }
          : classElement
      );
      setStudentClassData(updatedList);
      setErrorClass(null);
    } catch (error) {
      setErrorClass(`Failed to edit the class: ${selected}. Please try again.`);
      console.error(`An error occurred: ${error}`);
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem("studentClass", JSON.stringify(studentClassData));
      setErrorClass(null);
    } catch (error) {
      setErrorClass("Failed to save studentClass data to local storage.");
      console.error(`An error occurred: ${error}`);
    }
  }, [studentClassData]);

  return (
    <StudentClassContext.Provider
      value={{
        studentClassData,
        addClass,
        deleteClass,
        editClass,
        errorClass,
      }}
    >
      {children}
    </StudentClassContext.Provider>
  );
};
