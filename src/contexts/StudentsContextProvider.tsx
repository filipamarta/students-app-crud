import { useState, useEffect, ReactNode } from "react";
import { StudentsContext } from "./StudentsContext";
import { Student } from "../lib/definitions";

export const StudentsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [studentsData, setStudentsData] = useState<Student[]>(() => {
    const storedData = localStorage.getItem("students");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [errorStudent, setErrorStudent] = useState<string | null>(null); // If there are errors from saving on localstorage or CRUD, they will be shown here

  const addStudent = ({
    firstName,
    lastName,
    email,
    studentClass,
    studentId,
  }: Student) => {
    try {
      setStudentsData([
        ...studentsData,
        { firstName, lastName, email, studentClass, studentId },
      ]);
      setErrorStudent(null);
    } catch (error) {
      setErrorStudent(
        `Failed to add the student: ${{
          firstName,
          lastName,
          email,
          studentClass,
          studentId,
        }}. Please try again.`
      );
      console.error(`An error occurred: ${error}`);
    }
  };

  const deleteStudent = ({ studentId }: Pick<Student, "studentId">) => {
    try {
      const filteredStudentsList = studentsData.filter(
        (student) => student.studentId !== studentId
      );
      setStudentsData(filteredStudentsList);
      setErrorStudent(null);
    } catch (error) {
      setErrorStudent(
        `Failed to delete the student with studentId: ${{
          studentId,
        }}. Please try again.`
      );
      console.error(`An error occurred: ${error}`);
    }
  };

  const editStudent = ({
    firstName,
    lastName,
    email,
    studentClass,
    studentId,
  }: Student) => {
    try {
      const updatedStudentsList = studentsData.map((student) =>
        student.studentId === studentId
          ? { ...student, firstName, lastName, email, studentClass }
          : student
      );
      setStudentsData(updatedStudentsList);
      setErrorStudent(null);
    } catch (error) {
      setErrorStudent(
        `Failed to edit the student: ${{
          firstName,
          lastName,
          email,
          studentClass,
          studentId,
        }}. Please try again.`
      );
      console.error(`An error occurred: ${error}`);
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem("students", JSON.stringify(studentsData));
      setErrorStudent(null);
    } catch (error) {
      setErrorStudent(`Failed to save students data to local storage.`);
      console.error(`An error occurred: ${error}`);
    }
  }, [studentsData]);

  return (
    <StudentsContext.Provider
      value={{
        studentsData,
        addStudent,
        deleteStudent,
        editStudent,
        errorStudent,
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
};
