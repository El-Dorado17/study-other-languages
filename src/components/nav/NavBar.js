import { Link, useNavigate } from "react-router-dom" //? When you click a link, you're navigated to the corresponding page
import "./NavBar.css"





export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/cards">Cards</Link> 
            </li>
            {
                localStorage.getItem("language_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("language_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}

// ? Click and you'll be navigated to URL ending in "/cards" which is the list of cards