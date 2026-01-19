import { Link } from "react-router";
import { useAuth } from "./AuthContext";
import "../css/header.css"
import { useState, useEffect } from "react";
import Dropdown from "./dropdown";

function useIsSmall(breakpoint = 768) {
  const [isSmall, setIsSmall] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const onResize = () => setIsSmall(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return isSmall;
}

const Header = ({ links }) => {
  const { user, isAuthenticated, logout } = useAuth()
  const isSmall = useIsSmall();
  const [dotsClicked, setDotsClicked] = useState(false);

  const menuLinks = [...links];
  if (isSmall) {
    if (!isAuthenticated) {
      menuLinks.push({
        id: "login",
        href: "/login",
        title: "Log In",
      });
    } else {
      menuLinks.push({
        id: "logout",
        title: "Log Out",
        action: () => logout(),
      });
    }
  }

  return (
    <header>
      <nav>
        <h1 className="logo"><em>Admin Page</em></h1>

        {!isSmall ?
          <>
            <div className="links">
              {links.map(link => (
                <Link className="link" key={`link-${link.id}`} to={link.href}>
                  {link.title}
                </Link>
              ))}

              {!isAuthenticated && (
                <Link to="/login" className="link">
                  Log In
                </Link>
              )}

              {isAuthenticated && (
                <div
                  tabIndex={0}
                  className="logout link"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      logout()
                    }
                  }}
                  onClick={() => logout()}>
                  <span className="username">{user.username}</span>
                  <img height="20px" src="/assets/logout.svg" alt="Log Out" />
                </div>
              )}
            </div>
          </>
          :
          <div
            className="menu-wrapper"
            onMouseEnter={() => setDotsClicked(true)}
            onMouseLeave={() => setDotsClicked(false)}
            onFocus={() => setDotsClicked(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                setDotsClicked(false);
              }
            }}
            tabIndex={-1}
          >
            {dotsClicked ? (
              <Dropdown
                links={menuLinks}
              />
            ) : (
              <div tabIndex={0}>
                <img className="menu" src="/assets/menu.svg" alt="open menu" />
              </div>
            )}
          </div>
        }

      </nav>
    </header>
  );
};

export default Header