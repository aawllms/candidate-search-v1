import { Link } from "react-router-dom";

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
          {/* <a href="/">Home</a> */}
        </li>
        <li>
          <Link to="/SavedCandidates">Saved Candidates</Link>
          {/* <a href="/SavedCandidates">Potential Candidates</a> */}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
