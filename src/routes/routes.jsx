import App from "../pages/App";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../components/AuthContext";
import NewPost from "../pages/NewPost";
import Posts from "../pages/Posts";
import Post from "../pages/Post";
import EditPost from "../pages/EditPost";
import Users from "../pages/Users";

function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

const routes = [
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/", element: <App /> },
      { path: "/posts", element: <Posts /> },
      { path: "/users", element: <Users /> },
      { path: "/posts/new", element: <NewPost /> },
      { path: "/posts/:id", element: <Post /> },
      { path: "/posts/:id/edit", element: <EditPost /> },
    ],
  },
]

export default routes