import Header from "../components/Header";
import "../css/form.css"
import { useState } from "react";
import { useAuth } from "../components/AuthContext";
import { Navigate } from "react-router";
import Form from "../components/Form";
import { loginAdmin } from "../logic/fetch";

const FormLogic = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const { login } = useAuth()
  const [redirect, setRedirect] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")

    const res = await loginAdmin(username, password, adminPassword)

    const data = await res.json()

    if (data.error === 'Invalid Admin Password') {
      setError(data.error)
      setAdminPassword("")
      return
    }

    if (!res.ok) {
      setError(data.error || "Login failed")
      return;
    }

    await login(data.token);
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Form
        isLoginForm={true}
        handleSubmit={handleSubmit}
        error={error}
        password={password}
        setPassword={setPassword}
        username={username}
        setUsername={setUsername}
        adminPassword={adminPassword}
        setAdminPassword={setAdminPassword} />
    </>
  )
}

const Login = () => {
  return (
    <>
      <Header
        links={[
          { id: 1, title: "Home", href: "/" },
        ]}
      />
      <FormLogic />
    </>
  );
};

export default Login;
