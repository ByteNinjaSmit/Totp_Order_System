import { NavLink, Navigate, Outlet } from "react-router-dom";
import { FaUser, FaHome, FaRegListAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../store/auth";
import { IoMdTimer } from "react-icons/io";

export const AdminLayout = () => {
    const { user, isLoading } = useAuth();
    if (isLoading) {
        return (
            <>
                <h1>Loading ...........</h1>
            </>
        )
    }
    if (!user.isAdmin) {
        return <Navigate to="/" />
    } else {
        return (
            <>
                <header className="w-100">
                    <div className="container center">
                        <nav className="center">
                            <ul className="center mt-4 mb-1" style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                                <li><NavLink to="/admin"><FaHome /> Home</NavLink></li>
                                <li><NavLink to="/admin/users"><FaUser /> users</NavLink></li>
                                <li><NavLink to="/admin/services"><FaRegListAlt /> services</NavLink></li>
                                <li><NavLink to="/admin/contacts"><FaMessage /> Contacts</NavLink></li>
                                <li><NavLink to={`/admin/totp/${user._id}`}>
                                    <IoMdTimer />Totp
                                </NavLink></li>
                            </ul>
                        </nav>
                    </div>
                </header>
                <Outlet />
            </>
        );
    }
};