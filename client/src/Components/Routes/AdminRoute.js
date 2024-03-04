import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function AdminRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get('/api/v1/auth/admin-auth');
                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (error) {
                console.error(error);
                setOk(false); // Set ok to false if there's an error
            }
        };

        if (auth && auth.token) {
            authCheck();
        }
    }, [auth, auth?.token]);

    return ok ? <Outlet /> : <Spinner path="" />;
}