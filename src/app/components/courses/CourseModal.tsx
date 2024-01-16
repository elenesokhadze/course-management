import React, { FC, useEffect, useRef } from 'react';
import { ModalProps } from '../Modal';
import { Course } from './Course';
import axios from 'axios';
import { LabeledInput } from '../LabeledInput';
import useOutsideClick from '@/app/hooks/useOutsideClick';

const emptyCourse = {
    id: 0,
    course_name: '',
    course_difficulty: '',
    teacher_id: '',
    start_date: '',
    end_date: '',
};


const CourseModal: FC<ModalProps> = ({ isOpen, onClose, course, fetchAndSet }) => {

    const [formData, setFormData] = React.useState<Course>(emptyCourse);

    useEffect(() => {
        setFormData(course);
    }, [course]);

    const modalRef = useRef<HTMLDivElement>(null);

    useOutsideClick(modalRef, onClose);


    if (!isOpen) return null;


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const apiUrl = formData.id ? `/api/courses/update/${formData.id}` : '/api/courses/create';

            const response = await axios({
                method: formData.id ? 'put' : 'post',
                url: apiUrl,
                data: formData,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log(formData.id ? 'Course updated successfully.' : 'Course created successfully.');
                fetchAndSet();
                onClose(); // Close the modal after submitting
            } else {
                console.error(formData.id ? 'Failed to update course.' : 'Failed to create course.');
            }
        } catch (error) {
            console.error('An error occurred during the operation:', error);
        }
    };

    return (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-gradient-to-r from-[#FEAF00] via-[#F8D442] to-[#FEAF00]"></div>
            <div className="bg-white px-8 py-12 rounded-3xl z-10 relative" ref={modalRef}>
                <h2 className="text-2xl font-semibold text-center uppercase mb-8">{course ? "Edit Course" : "Add Course"}</h2>
                <form onSubmit={handleSubmit}>
                    <LabeledInput label={'Course Name'} type={'text'} name={'course_name'} value={formData?.course_name || ''} onChange={handleInputChange} placeholder={"Enter course name"} />
                    <LabeledInput label={'Course Difficulty'} type={'text'} name={'course_difficulty'} value={formData?.course_difficulty || ''} onChange={handleInputChange} placeholder={"Enter course difficulty"} />
                    <LabeledInput label={'Teacher ID'} type={'text'} name={'teacher_id'} value={formData?.teacher_id || ''} onChange={handleInputChange} placeholder={"Enter teacher ID"} />
                    <LabeledInput label={'Start Date'} type={'date'} name={'start_date'} value={formData?.start_date || ''} onChange={handleInputChange} placeholder={"Enter start date"} />
                    <LabeledInput label={'End Date'} type={'date'} name={'end_date'} value={formData?.end_date || ''} onChange={handleInputChange} placeholder={"Enter end date"} />
                    <div className="mt-16">
                        <button
                            type="submit"
                            className="bg-secondary text-white px-4 py-2.5 rounded w-full"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CourseModal;
