import * as yup from "yup";
import { Student, StudentClass } from "./definitions";

export const createStudentValidationSchema = (studentsData: Student[]) =>
  yup.object().shape({
    firstName: yup
      .string()
      .required("Please enter your first name.")
      .max(100, "Your first name must have a maximum of 100 characters length"),
    lastName: yup
      .string()
      .required("Please enter your last name.")
      .max(100, "Your last name must have a maximum of 100 characters length"),
    email: yup
      .string()
      .email("Please enter a valid email.")
      .required("Please enter your email."),
    studentId: yup
      .string()
      .required("Please enter your student Id.")
      .matches(/^\d{6}$/, "Your student ID must be exactly six digits.")
      .test("unique-id", "This student ID already exists.", (value) => {
        const existingStudent = studentsData.find(
          (student) => student.studentId === value
        );
        return !existingStudent;
      }),
    studentClass: yup
      .array()
      .required("Please enter your student class.")
      .of(
        yup.object().shape({
          name: yup
            .string()
            .required("Please enter your Class Name.")
            .max(
              100,
              "Your Class Name must have a maximum of 100 characters length"
            ),
          year: yup
            .string()
            .trim()
            .matches(/^\d{2}$/, "Class Year must be exactly two digits.")
            .required("Please enter your Class Year."),
        })
      )
      .min(1, "Please select at least one class"),
  });

export const createClassValidationSchema = (studentClassData: StudentClass[]) =>
  yup.object().shape({
    name: yup
      .string()
      .required("Please enter your Class Name.")
      .max(100, "Your Class Name must have a maximum of 100 characters length"),
    year: yup
      .string()
      .trim()
      .matches(/^\d{2}$/, "Class Year must be exactly two digits.")
      .required("Please enter your Class Year."),
    combined: yup
      .mixed()
      .test(
        "unique-class",
        "This class name and year combination already exists.",
        function () {
          const parent = this.parent ?? {}; // Because "combined" doesnt exist, we have to access the value like this
          const { name, year } = parent as StudentClass;

          if (!name || !year) {
            // If either field is missing, don't fail validation here
            return true;
          }

          const isRepeated = studentClassData.some(
            (classElement) =>
              classElement.name === name && classElement.year === year
          );
          return !isRepeated; // Pass validation if not a duplicate
        }
      ),
  });

export const editClassValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your Class Name.")
    .max(100, "Your Class Name must have a maximum of 100 characters length"),
  year: yup
    .string()
    .trim()
    .matches(/^\d{2}$/, "Class Year must be exactly two digits.")
    .required("Please enter your Class Year."),
});

export const editStudentValidationSchema = () =>
  yup.object().shape({
    firstName: yup
      .string()
      .required("Please enter your first name.")
      .max(100, "Your first name must have a maximum of 100 characters length"),
    lastName: yup
      .string()
      .required("Please enter your last name.")
      .max(100, "Your last name must have a maximum of 100 characters length"),
    email: yup
      .string()
      .email("Please enter a valid email.")
      .required("Please enter your email."),
    studentId: yup.string(),
    studentClass: yup
      .array()
      .required("Please enter your student class.")
      .of(
        yup.object().shape({
          name: yup
            .string()
            .required("Please enter your Class Name.")
            .max(
              100,
              "Your Class Name must have a maximum of 100 characters length"
            ),
          year: yup
            .string()
            .trim()
            .matches(/^\d{2}$/, "Class Year must be exactly two digits.")
            .required("Please enter your Class Year."),
        })
      )
      .min(1, "Please select at least one class"),
  });
