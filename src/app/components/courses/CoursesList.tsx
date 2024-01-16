"use client"
import axios from 'axios';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import { Course } from './Course';
import CourseModal from './CourseModal';

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



const CoursesList: React.FC<{ courses: Course[]; setCourses: Dispatch<SetStateAction<Course[]>>; fetchAndSet: () => Promise<void>; }> = ({ setCourses, fetchAndSet, courses }) => {

    useEffect(() => {
        const fetchData = async () => {
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

        fetchData();
    }, []);


    const [selectedCourse, setSelectedCourse] = useState<Course>(emptyCourse);

    const handleEdit = (course: Course) => {
        setSelectedCourse(course);
    };


    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/api/courses/delete/${id}`);

            setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
            fetchAndSet()
            console.log('Course deleted successfully.');
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error deleting course:', error.message);
            } else {
                console.error('An unknown error occurred:', error);
            }
        }
    };

    const closeModal = () => {
        setSelectedCourse(emptyCourse);
    };

    return (
        <div>
            <div className='flex items-center gap-4 rounded-md h-[58px] text-mainTitle text-xs font-semibold p-4'>
                <div className='flex-1'>Course Name</div>
                <div className='flex-1'>Course Difficulty</div>
                <div className='flex-1'>Teacher ID</div>
                <div className='flex-1'>Start Date</div>
                <div className='flex-1'>End Date</div>
                <div className='flex-1'></div>
            </div>
            <div className='flex flex-col gap-3'>
                {courses.map((course) => (
                    <ul key={course.id} className='flex items-center bg-white text-sm font-normal rounded-md h-[85px] gap-4 p-4'>
                        <li className='flex-1'>{course.course_name}</li>
                        <li className='flex-1'>{course.course_difficulty}</li>
                        <li className='flex-1'>{course.teacher_id}</li>
                        <li className='flex-1'>{course.start_date}</li>
                        <li className='flex-1'>{course.end_date}</li>
                        <li className='flex-1 flex justify-center gap-2'>
                            <Image src="/icons/pen.svg" alt="pen" width={19} height={19} className='cursor-pointer' onClick={() => handleEdit(course)}
                            />
                            <Image src="/icons/trash.svg" alt="trash" width={16} height={18} className='cursor-pointer' onClick={() => handleDelete(course.id)}
                            />
                        </li>
                    </ul>
                ))}
                <CourseModal
                    isOpen={selectedCourse.id > 0}
                    onClose={closeModal}
                    course={selectedCourse}
                    student={emptyStudent}
                    fetchAndSet={fetchAndSet}
                />
            </div>
        </div>
    );
};

export default CoursesList;
