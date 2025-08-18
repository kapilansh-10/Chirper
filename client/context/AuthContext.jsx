import { useState, createContext, useEffect } from "react";

export  const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token) {
            try {
                const decodedToken = jwtDecode(token);

                if (decodedToken.exp * 1000 > Date.now()){
                    setUser(decodedToken.user)
                }
                else {
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error('Failed to decode token',error);
                localStorage.removeItem('token')
            }
        }
    })

    const login = (userData) => {
        setUser(userData)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('token')
    }


    return (
        <AuthContext.Provider value={ {login, user, logout} }>
            {children}
        </AuthContext.Provider>
    )
}

