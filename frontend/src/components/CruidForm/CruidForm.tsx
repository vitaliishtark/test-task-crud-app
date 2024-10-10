import React, { useEffect, useState } from 'react';

import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { createUser, editUser, getUser } from '../../service';
import { Navigate, useParams } from 'react-router-dom';
import './style.css';

function CruidForm() {
    const params = useParams();
    const [isError, setIsError] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        city: "",
        phoneNumber: "",
        UserProfile: null
    });

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsError(false);
        }, 4000);
    }, [isError]);

    useEffect(() => {
        const handleFetch = async () => {
            if (params.userId) {
                const userData = await getUser(params.userId);
                if (userData) {
                    setFormData({
                        ...userData,
                        ...userData.UserProfile
                    });
                }
            }
        };
        handleFetch();
    }, [params.userId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (params.userId) {
            await editUser(params.userId, formData);

            setRedirect(true)
        } else {
            const isUserCreated = await createUser(formData);

            if (isUserCreated) {
                setRedirect(true);
            }
            setIsError(true);
        }
    };

    if (redirect) {
        return <Navigate to="/" replace={true} />;
    }
    return (
        <form className="cruid-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName || ''}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label>Last Name:</label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName || ''}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label>Date of Birth:</label>
                <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth?.toString().split('T')[0] || ''}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label>City:</label>
                <input
                    type="text"
                    name="city"
                    value={formData.city || ''}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label>Phone Number:</label>
                <PhoneInput
                    defaultCountry="ua"
                    name="phoneNumber"
                    value={formData.phoneNumber || ''}
                    onChange={(phone) => {
                        setFormData(prevData => ({
                            ...prevData,
                            phoneNumber: phone
                        }));
                    }}
                />
            </div>
            {isError ? <div className='errorMessage'>Something went wrong or user already exists</div> : null}
            <button className="submit-btn" type="submit">
                {params.userId ? 'Edit User' : 'Create User'}
            </button>
        </form>
    );
}

export default CruidForm;
