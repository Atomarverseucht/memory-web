import {Link, useLocation, useNavigate} from "react-router-dom";

type User = { id: string; name: string };

export function UserBar(){
    useLocation(); // re-render bei jeder Navigation
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") ?? "null") as User | null;
    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    }
    return (<>
        {user ? (
            <Link className="account-bar" to="/account">
                Account: {user.name}
            </Link>
        ) : (
            <Link className="no-account-bar" to="/login">
                Please login
            </Link>
        )}
        {user && (
            <button className="logout-button" onClick={logout}>Logout from User: <p>{user.name}</p></button>
        )}
    </>);
}
