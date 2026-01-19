import { Link } from "react-router";
import "../css/globle.css"

const NotFound = () => {
  return (
    <div className="notFoundWrapper">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="home-btn">
        Go home
      </Link>
    </div>
  );
};

export default NotFound;