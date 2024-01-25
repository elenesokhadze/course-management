import React, { FC, useEffect, useRef, useState } from 'react';
import { Student } from './Student';
import { ModalProps } from '../Modal';
import axios from 'axios';
import { LabeledInput } from '../LabeledInput';
import useOutsideClick from '@/app/hooks/useOutsideClick';

const emptyStudent = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    personal_number: '',
};

const StudentModal: FC<ModalProps> = ({ isOpen, onClose, student, fetchAndSet }) => {

    const [formData, setFormData] = useState<Student>(emptyStudent);

    useEffect(() => {
        setFormData(student);
    }, [student]);


    const modalRef = useRef<HTMLDivElement>(null);

    useOutsideClick(modalRef, onClose);

    if (!isOpen) return null;


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (formData) {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const apiUrl = formData.id ? `/api/students/update/${formData.id}` : '/api/students/create';

            const response = await axios({
                method: formData.id ? 'put' : 'post',
                url: apiUrl,
                data: formData,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log(formData.id ? 'Student updated successfully.' : 'Student created successfully.');
                fetchAndSet();
                onClose();
            } else {
                console.error(formData.id ? 'Failed to update student.' : 'Failed to create student.');
            }
        } catch (error) {
            console.error('An error occurred during the operation:', error);
        }
    };



    return (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-gradient-to-r from-[#FEAF00] via-[#F8D442] to-[#FEAF00]"></div>
            <div className="bg-white px-8 py-8 rounded-3xl z-10 relative h-[95%]" ref={modalRef}>
                <h2 className="text-2xl font-semibold text-center uppercase mb-8">{formData ? "Edit Student" : "Add Student"}</h2>
                <form onSubmit={handleSubmit}>
                    <LabeledInput label={'Name'} type={'text'} name={'name'} value={formData?.name || ''} onChange={handleInputChange} placeholder={"Enter your name"} />
                    <LabeledInput label={'Email'} type={'email'} name={'email'} value={formData?.email || ''} onChange={handleInputChange} placeholder={"Enter your email"} />
                    <LabeledInput label={'Phone'} type={'tel'} name={'phone'} value={formData?.phone || ''} onChange={handleInputChange} placeholder={"Enter your phone"} />
                    <LabeledInput label={'Personal Number'} type={'text'} name={"personal_number"} value={formData?.personal_number || ''} onChange={handleInputChange} placeholder={"Enter your personal number"} />
                    <div className="mt-10">
                        <button
                            type="submit"
                            className="bg-secondary text-white px-4 py-2.5 rounded w-full"
                        >
                            {formData ? "EDIT" : "ADD"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentModal;
