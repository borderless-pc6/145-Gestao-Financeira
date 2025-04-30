// src/components/PrivateRoute.tsx
import { JSX, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebaseconfig";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: JSX.Element;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthenticated(!!user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (!authenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
}
