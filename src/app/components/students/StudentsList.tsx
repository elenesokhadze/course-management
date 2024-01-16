"use client"
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { Student } from './Student';
import StudentModal from './StudentModal';

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


const StudentsList: React.FC<{ students: Student[]; setStudents: Dispatch<SetStateAction<Student[]>>; fetchAndSet: () => Promise<void>; }> = ({ setStudents, fetchAndSet, students }) => {

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/students');
                const data: Student[] = response.data;
                setStudents(data);
            } catch (error) {
                if (error instanceof Error) {
                    console.error('Error fetching students:', error.message);
                } else {
                    console.error('An unknown error occurred:', error);
                }
            }
        };

        fetchData();
    }, []);


    const [selectedStudent, setSelectedStudent] = useState<Student>(emptyStudent);

    const handleEdit = (student: Student) => {
        setSelectedStudent(student);
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/api/students/delete/${id}`);

            setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
            fetchAndSet()
            console.log('Student deleted successfully.');
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error deleting student:', error.message);
            } else {
                console.error('An unknown error occurred:', error);
            }
        }
    };

    const closeModal = () => {
        setSelectedStudent(emptyStudent);
    };


    return (
        <div>
            <div className='flex items-center rounded-md h-[58px] gap-4 p-4 text-mainTitle text-xs font-semibold '>
                <div className='flex-1'>Name</div>
                <div className='flex-1'>Email</div>
                <div className='flex-1'>Phone</div>
                <div className='flex-1'>Personal Number</div>
                <div className='flex-1'></div>
            </div>
            <div className='flex flex-col gap-2'>
                {students.map((student) => (
                    <ul key={student.id} className='flex items-center bg-white text-sm font-normal rounded-md h-[85px] gap-4 p-4'>
                        <li className='flex-1'>{student.name}</li>
                        <li className='flex-1'>{student.email}</li>
                        <li className='flex-1'>{student.phone}</li>
                        <li className='flex-1'>{student.personal_number}</li>
                        <li className='flex-1 flex justify-center gap-2'>
                            <Image src="/icons/pen.svg" alt="pen" width={19} height={19} className='cursor-pointer' onClick={() => handleEdit(student)}
                            />
                            <Image src="/icons/trash.svg" alt="trash" width={16} height={18} className='cursor-pointer' onClick={() => handleDelete(student.id)}
                            />
                        </li>
                    </ul>
                ))}
                <StudentModal
                    isOpen={selectedStudent.id > 0}
                    onClose={closeModal}
                    student={selectedStudent}
                    course={emptyCourse}
                    fetchAndSet={fetchAndSet}
                />
            </div>
        </div>
    );
};

export default StudentsList;
