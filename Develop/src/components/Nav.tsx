import "../index.css"; 
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Candidate Search</Link></li>
        <li><Link to="/saved">Saved Candidates</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
