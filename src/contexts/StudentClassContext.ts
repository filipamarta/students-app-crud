import { createContext } from "react";
import { StudentClass } from "../lib/definitions";

export type StudentClassContextType = {
  studentClassData: StudentClass[];
  addClass: ({ name, year }: StudentClass) => void;
  editClass: ({
    selected,
    updated,
  }: {
    selected: StudentClass;
    updated: StudentClass;
  }) => void;
  deleteClass: ({ name, year }: StudentClass) => void;
  errorClass: string | null;
};

export const StudentClassContext = createContext<
  StudentClassContextType | undefined
>(undefined);
