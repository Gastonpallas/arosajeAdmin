import React, { useEffect, useState } from 'react';
import { useNavigate  } from "react-router-dom";
import {API_USER} from "../Constantes/API";
function Admin() {
    const [users, setUsers] = useState([]);
    const [hasFetchedUsers, setHasFetchedUsers] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!hasFetchedUsers) {
            const fetchUsers = async () => {
                try {
                    const response = await fetch(API_USER.ALL_USERS, {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('token')}`
                        }
                    });

                    const data = await response.json();
                    console.log(data)
                    setUsers(data);
                    setHasFetchedUsers(true);
                } catch (error) {
                    console.error('Erreur de la requête:', error);
                }
            };

            fetchUsers();
        }
    }, [hasFetchedUsers]);

    const handleIsBotanisteClick = async (user) => {
        try {
            const response = await fetch(API_USER.USER_LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                window.location.reload();
            } else {
                console.error('Erreur lors de la requête de mise à jour');
            }
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
        }
    };



    return (
        <div>
            <h2>Liste des utilisateurs :</h2>
            <ul className="flex flex-col">
                {users.map(user => (
                    <button key={user.mail} className="bg-zinc-300 text-white mb-4 rounded-lg p-4"  onClick={() => navigate(`/userDetail/${user.id}`)}>
                        <li className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-lime-600 font-bold">{user.name} {user.surName}</span>
                                <span className="text-lime-600 font-bold">{user.mail}</span>
                            </div>
                            <div>
                                <button
                                    className={`${
                                        user.isAdmin ? 'bg-blue-500' : 'bg-red-500'
                                    } text-white px-4 py-2 rounded-lg mr-2`}
                                >
                                    {user.isAdmin ? 'Admin' : 'Non Admin'}
                                </button>
                                <button
                                    className={`${
                                        user.isBotaniste ? 'bg-blue-500' : 'bg-red-500'
                                    } text-white px-4 py-2 rounded-lg`}
                                    onClick={() => handleIsBotanisteClick(user)}
                                >
                                    {user.isBotaniste ? 'Botaniste' : 'Non Botaniste'}
                                </button>
                            </div>
                        </li>
                    </button>
                ))}
            </ul>
        </div>
    );

}

export default Admin;
