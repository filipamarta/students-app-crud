import { createContext } from "react";
import { Student } from "../lib/definitions";

export type StudentsContextType = {
  studentsData: Student[];
  editStudent: ({
    firstName,
    lastName,
    email,
    studentClass,
    studentId,
  }: Student) => void;
  deleteStudent: ({ studentId }: Pick<Student, "studentId">) => void;
  addStudent: ({
    firstName,
    lastName,
    email,
    studentClass,
    studentId,
  }: Student) => void;
  errorStudent: string | null;
};

export const StudentsContext = createContext<StudentsContextType | undefined>(
  undefined
);
