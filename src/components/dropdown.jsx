import { Link } from "react-router-dom";

const Dropdown = ({ links }) => {
  return (
    <div className="openMoreOptions">
      {links.map(link =>
        link.action ? (
          <div
            key={link.id}
            className={`${link.className ? link.className : ""} dropdown-link`}
            onClick={link.action}
            tabIndex={0}
          >
            {link.title}
          </div>
        ) : (
          <Link key={link.id} to={link.href} className={`${link.className ? link.className : ""} dropdown-link`}>
            {link.title}
          </Link>
        )
      )}
    </div>
  );
};

export default Dropdown;
