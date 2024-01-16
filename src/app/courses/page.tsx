"use client"
import { useState } from "react";
import CoursesList from "../components/courses/CoursesList";
import CourseModal from "../components/courses/CourseModal";
import axios from "axios";
import { Course } from "../components/courses/Course";


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
const CoursesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [courses, setCourses] = useState<Course[]>([]);


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const fetchAndSetCourses = async () => {
        try {
            const response = await axios.get('/api/courses');
            setCourses(response.data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error fetching courses:', error.message);
            } else {
                console.error('An unknown error occurred:', error);
            }
        }
    };


    return (
        <div className="px-7">
            <div className="flex justify-between items-center border-b border-line">
                <h1 className="flex items-center text-2xl font-bold py-5">Course List</h1>
                <button
                    className="w-[199px] h-[44px] rounded-md bg-secondary text-sm font-medium text-white hover:bg-opacity-80"
                    onClick={openModal}
                >
                    ADD NEW COURSE
                </button>
            </div>
            <CoursesList courses={courses} setCourses={setCourses} fetchAndSet={fetchAndSetCourses} />
            {isModalOpen && <CourseModal isOpen={isModalOpen} onClose={closeModal} course={emptyCourse} student={emptyStudent} fetchAndSet={fetchAndSetCourses} />}
        </div>
    );
};

export default CoursesPage;