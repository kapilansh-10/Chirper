import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export const HomePage = () => {

    const { user, logout } = useContext(AuthContext);

    return (
        <div>
            {user ?
                (<div>
                    <p>Welcome, {user.username}</p>
                    <button onClick={logout}>Logout</button>
                </div>)
                :
                null
            }
        </div>
    )
}