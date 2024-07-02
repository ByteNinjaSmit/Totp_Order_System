import { useAuth } from "../store/auth";
import { Navigate } from "react-router-dom";


export const Qr = () => {
    const { user } = useAuth();

    if(!user){
        return <Navigate to="/login" />;
    }
    return (
        <>
        <h1 className="text-center mt-3 pt-3 pb-3">Scan Qr On Table</h1>
        </>
    )
}