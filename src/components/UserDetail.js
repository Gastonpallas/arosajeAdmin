import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { NotificationManager } from 'react-notifications';
import 'tailwindcss/tailwind.css';
import {API_URL_USER, API_USER} from "../Constantes/API";

function UserDetail() {
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [hasFetchedUsers, setHasFetchedUsers] = useState(false);

    useEffect(() => {
        if (!hasFetchedUsers) {
            const fetchUsers = async () => {
                try {
                    const response = await fetch( API_URL_USER + id, {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                        },
                    });
                    const data = await response.json();
                    setUser(data);
                    setHasFetchedUsers(true);
                    console.log(data);
                } catch (error) {
                    console.error('Erreur de la requête:', error);
                }
            };

            fetchUsers();
        }
    }, [hasFetchedUsers, id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(API_USER.CHANGE_INFOS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
                body: JSON.stringify(user),
            });
            if (response.ok) {
                NotificationManager.success('Modification effectuée');
            } else {
                console.error('Erreur lors de la requête de mise à jour');
            }
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <div className="mx-auto max-w-md mt-8">
            <h2 className="text-2xl mb-4">Modifier l'utilisateur :</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="text-lg">
                        Nom :
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={user.name || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded border border-gray-300"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="surName" className="text-lg">
                        Prénom :
                    </label>
                    <input
                        type="text"
                        id="surName"
                        name="surName"
                        value={user.surName || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded border border-gray-300"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="mail" className="text-lg">
                        Email :
                    </label>
                    <input
                        type="email"
                        id="mail"
                        name="mail"
                        value={user.mail || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded border border-gray-300"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="text-lg">
                        Numéro de téléphone :
                    </label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={user.phoneNumber || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded border border-gray-300"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="isAdmin" className="text-lg">
                        Admin :
                    </label>
                    <input
                        type="checkbox"
                        id="isAdmin"
                        name="isAdmin"
                        checked={user.isAdmin || false}
                        onChange={handleInputChange}
                        className="mx-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="isBotaniste" className="text-lg">
                        Botaniste :
                    </label>
                    <input
                        type="checkbox"
                        id="isBotaniste"
                        name="isBotaniste"
                        checked={user.isBotaniste || false}
                        onChange={handleInputChange}
                        className="mx-2"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded"
                >
                    Enregistrer
                </button>
            </form>
        </div>
    );
}

export default UserDetail;
