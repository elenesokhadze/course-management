import { Student } from "./students/Student";
import { Course } from "./courses/Course";

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    student: Student;
    course: Course;
    fetchAndSet: () => Promise<void>;
}
