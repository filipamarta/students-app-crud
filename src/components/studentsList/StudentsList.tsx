import { useStudents } from "../../contexts/useStudents";
import { constants } from "../../lib/contants";
import StudentCard from "../studentCard/StudentCard";
import styles from "./studentsList.module.css";

const StudentsList = () => {
  const { studentsData } = useStudents();
  return studentsData.length > 0 ? (
    <section className={styles.container}>
      {studentsData.map((student, id) => (
        <StudentCard key={`${student.firstName}-${id}`} {...student} />
      ))}
    </section>
  ) : (
    <div className={styles.emptyContainer}>
      <h2>{constants.studentsList.empty.title}</h2>
      <p>{constants.studentsList.empty.text}</p>
    </div>
  );
};

export default StudentsList;
