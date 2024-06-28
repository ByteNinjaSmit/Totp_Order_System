import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import {Link} from "react-router-dom";

export const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const { authorizationToken } = useAuth();

    const getAllUserData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/users", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.status}`);
            }
            const data = await response.json();
            setUsers(data);
            // console.log(`users ${data}`);
        } catch (error) {
            setError(error.message);
        }
    };
    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();
            console.log(`User After Delete ${data}`);
            if (response.ok){
                getAllUserData();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllUserData().catch((error) => {
            setError(error.message);
        });
    }, [authorizationToken]);

    return (
        <>            <h1 className="w-100 mx-auto text-center mt-4 mb-3 text-dark-emphasis">Admin Users Panel</h1>
            {error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <table className="table table-hover table-striped table-dark table-bordered w-75 mx-auto mt-3 text-center ">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Admin</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((curUser, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{curUser.username}</td>
                                    <td>{curUser.email}</td>
                                    <td>{curUser.phone}</td>
                                    <td>{curUser.isAdmin ? "Yes" : "No"}</td>
                                    <td>
                                        <button className="btn"><Link className="btn btn-info" to={`/admin/users/${curUser._id}/edit`}>Edit</Link> </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => deleteUser(curUser._id)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}

        </>
    );
};