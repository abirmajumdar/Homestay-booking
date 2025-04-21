import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [authUser, setAuthUser] = useState(undefined); // starts undefined
    const [loading, setLoading] = useState(true); // loading while we check localStorage

    useEffect(() => {
        const storedUser = localStorage.getItem("User");
        if (storedUser) {
            try {
                setAuthUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Error parsing user from localStorage:", error);
                setAuthUser(null);
            }
        } else {
            setAuthUser(null); // explicitly set to null if nothing found
        }
        setLoading(false); // done checking
    }, []);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
