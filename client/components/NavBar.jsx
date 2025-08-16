export const NavBar = ({setCurrentView}) => {
    return (
        <nav>
            <button onClick={() => setCurrentView('login')}>Login</button>
            <button onClick={() => setCurrentView('register')}>Register</button>
        </nav>
    )
}