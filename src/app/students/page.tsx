"use client"
import { useState } from "react";
import StudentsList from "../components/students/StudentsList";
import StudentModal from "../components/students/StudentModal";
import axios from "axios";
import { Student } from "../components/students/Student";


const emptyCourse = {
    id: 0,
    course_name: '',
    course_difficulty: '',
    teacher_id: '',
    start_date: '',
    end_date: '',
};

const emptyStudent = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    personal_number: '',
};

const StudentsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [students, setStudents] = useState<Student[]>([]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const fetchAndSetStudents = async () => {
        try {
            const response = await axios.get('/api/students');
            setStudents(response.data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error fetching students:', error.message);
            } else {
                console.error('An unknown error occurred:', error);
            }
        }
    };

    return (
        <div className="px-7">
            <div className="flex justify-between items-center border-b border-line">
                <h1 className="flex items-center text-2xl font-bold py-5">Students List</h1>
                <button className="w-[199px] h-[44px] rounded-md bg-secondary text-sm font-medium text-white hover:bg-opacity-80"
                    onClick={openModal}
                >ADD NEW STUDENT</button>
            </div>
            <StudentsList students={students} setStudents={setStudents} fetchAndSet={fetchAndSetStudents} />
            {isModalOpen && <StudentModal isOpen={isModalOpen} onClose={closeModal} student={emptyStudent} course={emptyCourse} fetchAndSet={fetchAndSetStudents} />}
        </div>
    )
};



export default StudentsPage;
