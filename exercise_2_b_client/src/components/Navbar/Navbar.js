import { Link } from "react-router-dom"
import './navbar.css'
const Navbar = () => {
    return (
        <nav>
            <h1>Node.js <span className="session">Session</span></h1>

            <ul>
                <li><Link to="/">List</Link></li>
                <li><Link to="/create">Create</Link></li>
            </ul>
        </nav>
    )
    
}

export default Navbar