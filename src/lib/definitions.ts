export type StudentClass = {
  name: string;
  year: string;
};

export type Student = {
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  studentClass: StudentClass[];
};

export type CreateClassFormValues = {
  studentClassName: string;
  studentClassYear: string;
};

export interface ExtendedStudentClass extends StudentClass {
  combined?: string;
}
