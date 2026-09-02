import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav>
            <Link to="/">Home</Link>

            <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
                About
            </NavLink>

            <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
                Contact
            </NavLink>

            <NavLink to="/music" className={({ isActive }) => (isActive ? "active" : "")}>
                Music
            </NavLink>
        </nav>
    );
}

export default Navbar;