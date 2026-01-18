import { Link } from "react-router-dom";

const Dropdown = ({ links, item, handleListItemDelete, hasDelete }) => {

  return (
    <div
      className="openMoreOptions"
    >
      {links.map((link) => (
        <Link key={link.id} to={link.path} className="dropdown-link">
          {link.label}
        </Link>
      ))}

      {hasDelete &&
        <div
          className="delete"
          tabIndex={0}
          onClick={() => handleListItemDelete(item.id)}
        >
          Delete
        </div>
      }

    </div>
  );
};

export default Dropdown;
