import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../store/auth";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


export const AdminUpdate = () => {
    const navigate = useNavigate();

    const { authorizationToken } = useAuth();
    const params = useParams();
    const [data, setData] = useState({
        username: "",
        email: "",
        phone: "",
    });

    const getSingleUserData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            })
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.log(`Admin Update Userdata: ${error}`);
        }
    }

    useEffect(() => {
        getSingleUserData();
    }, []);

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setData({
            ...data,
            [name]: value,
        })
    };
    // ----------------
    // To Update Data Dynamically Logic
    // ------------------------

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                toast.success("Updated Successfull");
                navigate("/admin/users");
            }else{
                toast.alert("Not Update Failed");
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="container w-100 mx-auto">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className="text-center">Update User Data</h1>
                    <form className="form-horizontal align-content-center mx-auto" onSubmit={handleSubmit}>
                        <div className="form-group mx-auto mt-3">
                            <label className="control-label col-sm-4" htmlFor="username">Username:</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    maxLength="20"
                                    autoComplete="off"
                                    value={data.username}
                                    onChange={handleInput}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <label className="control-label col-sm-4" htmlFor="email">Email:</label>
                            <div className="col-sm-8">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    maxLength="50"
                                    autoComplete="off"
                                    value={data.email}
                                    onChange={handleInput}
                                    required
                                />              </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4 mt-3" htmlFor="phone">Mobile:</label>
                            <div className="col-sm-8">
                                <input
                                    type="tel"
                                    className="form-control "
                                    id="phone"
                                    name="phone"
                                    maxLength="15"
                                    autoComplete="off"
                                    value={data.phone}
                                    onChange={handleInput}
                                    required
                                />              </div>
                        </div>
                        <div className="form-group mx-auto text-center">
                            <div className="col-sm-12 text-center mt-3">
                                <button type="submit" className="btn btn-primary">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};