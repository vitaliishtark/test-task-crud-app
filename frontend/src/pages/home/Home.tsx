import React, { useEffect, useState } from 'react';
import { deleteUser, getAllUsers } from '../../service';
import { Link } from 'react-router-dom';
import './style.css';

export default function Home() {
    const [users, setUsers] = useState([]);

    const handleFetchUsers = async () => {
        const data = await getAllUsers();
        setUsers(data);
    };

    const handleDeleteUser = async (userId: string) => {
        await deleteUser(userId);
        handleFetchUsers();
    };

    useEffect(() => {
        handleFetchUsers();
    }, []);

    return (
        <div className="container">
            <h1 className="heading">User List</h1>
            <div className="cardContainer">
                {users?.length ? users.map((user: any) => (
                    <div key={user.id} className="card">
                        <h3 className="name">{`${user.firstName}`}</h3>
                        <p className='name'>
                            {user.lastName}
                        </p>
                        <p className="email">Email: {user.email}</p>
                        <div className="actions">
                            <button className="deleteButton" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                            <Link className="linkButton" to={`user/${user.id}`}>View Details</Link>
                        </div>
                    </div>
                )) : 'Loading...'}
            </div>
            <Link className="createButton" to={'createUser'}>Create User</Link>
        </div>
    );
}
